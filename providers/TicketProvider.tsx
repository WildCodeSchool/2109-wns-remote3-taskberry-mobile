import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface ITicketContext {
  tickets: Ticket[] | null;
  setTickets: Dispatch<SetStateAction<Ticket[] | null>>;
  ticket: Ticket | null;
  setTicket: Dispatch<SetStateAction<Ticket | null>>;
}

const defaultContextValues: ITicketContext = {
  tickets: null,
  setTickets: () => {},
  ticket: null,
  setTicket: () => {},
};

export const TicketContext =
  createContext<ITicketContext>(defaultContextValues);

export const TicketProvider: FC = ({ children }: any) => {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);

  return (
    <TicketContext.Provider value={{ tickets, setTickets, ticket, setTicket }}>
      {children}
    </TicketContext.Provider>
  );
};
