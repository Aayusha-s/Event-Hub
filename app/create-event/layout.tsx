import CreateEventLayoutClient from './CreateEventLayoutClient';

export default function CreateEventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <CreateEventLayoutClient>{children}</CreateEventLayoutClient>;
}
