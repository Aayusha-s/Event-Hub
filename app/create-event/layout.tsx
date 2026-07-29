
import CreateEventStepper from "@/components/CreateEventStepper";

export default function CreateEventLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6 space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-text-dark">
                    Create New Event
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-text-light">
                    Build your event one step at a time. Your draft is stored locally while you work.
                </p>
            </div>

            <CreateEventStepper />
            {children}
        </section>
    );
}

