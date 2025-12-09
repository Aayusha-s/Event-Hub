

const EventCard = () => {

    return (
        <section className="mx-5 px-4">
            <div className="border border-brown-normal w-[389.8px] h-[430.78px] rounded-[10px] p-4 ">
                {/* tags and image */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        {/* <TagsButton title="Music"/>
                        <TagsButton title="Trending"/> */}
                    </div>
                    <img src="/images/party.png" alt="Summer Music Festival" />
                </div>
                <div>
                    <i className="fa-regular fa-calendar"></i>
                    <h3>Summer Music Festival 2025</h3>
                    <h3>By Department of Festivals</h3>
                </div>
                <div>
                    <p>Musical Events</p>
                    <p>All University students can join</p>
                </div>
                <div>
                    <div>
                        <i className="fa-solid fa-location-dot"></i>
                        <p>Central Park, New York</p>
                        <p>Rs.360</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default EventCard