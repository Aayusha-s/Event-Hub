import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Activity from '@/models/Activity';
import Photo from '@/models/Photo';
import User from '@/models/User';
import Event from '@/models/Event';
import { listEvents } from '@/services/events/event.service';

const relativeTime = (value: Date) => {
    const diff = Date.now() - new Date(value).getTime();
    const minutes = Math.max(1, Math.floor(diff / 60000));
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? '' : 's'} ago`;
};

export async function GET() {
    await dbConnect();

    const [activityDocs, photoDocs, eventResult, topicDocs, memberDocs] = await Promise.all([
        Activity.find().populate('user', 'name profileImage role username').sort({ createdAt: -1 }).limit(8).lean(),
        Photo.find().populate('user', 'name profileImage username').sort({ createdAt: -1 }).limit(12).lean(),
        listEvents({ page: 1, pageSize: 12, status: 'published', sort: 'newest' }),
        Event.aggregate([
            { $match: { status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
        ]),
        User.aggregate([
            { $match: { privacy: 'public' } },
            { $lookup: { from: 'follows', localField: '_id', foreignField: 'following', as: 'followers' } },
            { $lookup: { from: 'follows', localField: '_id', foreignField: 'follower', as: 'following' } },
            {
                $project: {
                    name: 1,
                    role: 1,
                    profileImage: 1,
                    username: 1,
                    interests: 1,
                    followersCount: { $size: '$followers' },
                    followingCount: { $size: '$following' },
                },
            },
            { $sort: { followersCount: -1, createdAt: -1 } },
            { $limit: 8 },
        ]),
    ]);

    const feed = activityDocs.map((activity: any) => ({
        id: String(activity._id),
        nameAbv: (activity.user?.name ?? 'U').split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase(),
        name: activity.user?.name ?? 'Community member',
        userType: activity.user?.role ?? 'Member',
        timeAgo: relativeTime(activity.createdAt),
        postContent: activity.description ?? activity.title,
        imgUrl: activity.user?.profileImage ?? '/images/party.png',
        profileUrl: activity.user?.username ? `/userprofile?username=${encodeURIComponent(activity.user.username)}` : `/userprofile?userId=${activity.user?._id ?? ''}`,
        likes: 0,
        comments: 0,
        shares: 0,
    }));

    const photos = photoDocs.map((photo: any) => ({
        id: String(photo._id),
        src: photo.imageUrl,
        alt: photo.caption ?? 'Community photo',
        likes: photo.likes?.length ?? 0,
        comments: photo.comments?.length ?? 0,
        category: photo.event ? 'Event' : 'Community',
    }));

    const events = eventResult.items;
    const meetups = eventResult.items.slice(0, 6).map((event: any) => ({
        title: event.title,
        relatedEvent: event.category,
        date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(event.startDate)),
        time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(event.startDate)),
        location: event.venue,
        attendeesCount: String(event.ticketsSold ?? 0),
        totalSpots: String(event.capacity ?? 0),
    }));

    const trendingTopics = topicDocs.map((topic: any) => ({ title: topic._id, postCount: topic.count }));

    const members = memberDocs.map((member: any) => ({
        name: member.name,
        role: member.role,
        tags: (member.interests ?? []).slice(0, 3),
        followersCount: member.followersCount,
        followingCount: member.followingCount,
        profileUrl: member.username ? `/userprofile?username=${encodeURIComponent(member.username)}` : `/userprofile?userId=${member._id}`,
    }));

    return NextResponse.json({ success: true, data: { feed, photos, events, trendingTopics, meetups, members } });
}