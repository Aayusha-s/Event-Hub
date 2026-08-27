'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
    createEmptyTicket,
    loadEventInfoTickets,
    saveEventInfoTickets,
    type TicketDraft,
} from '@/lib/createEventDraft';

type CreateEventTicketsContextValue = {
    tickets: TicketDraft[];
    setTickets: (updater: TicketDraft[] | ((prev: TicketDraft[]) => TicketDraft[])) => void;
};

const CreateEventTicketsContext = createContext<CreateEventTicketsContextValue | null>(null);

export function CreateEventDraftProvider({ children }: { children: React.ReactNode }) {
    const [tickets, setTicketsState] = useState<TicketDraft[]>([createEmptyTicket()]);

    useEffect(() => {
        setTicketsState(loadEventInfoTickets());
    }, []);

    const setTickets = useCallback(
        (updater: TicketDraft[] | ((prev: TicketDraft[]) => TicketDraft[])) => {
            setTicketsState((prev) => {
                const next = typeof updater === 'function' ? updater(prev) : updater;
                saveEventInfoTickets(next);
                return next;
            });
        },
        []
    );

    return (
        <CreateEventTicketsContext.Provider value={{ tickets, setTickets }}>
            {children}
        </CreateEventTicketsContext.Provider>
    );
}

export function useCreateEventTickets() {
    const context = useContext(CreateEventTicketsContext);
    if (!context) {
        throw new Error('useCreateEventTickets must be used within CreateEventDraftProvider');
    }

    return context;
}
