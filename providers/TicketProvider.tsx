import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

interface ITicketContext {
  tickets: Ticket[] | null;
  setTickets: Dispatch<SetStateAction<Ticket[] | null>>;
}

const defaultContextValues: ITicketContext = {
  tickets: null,
  setTickets: () => {},
};

export const TicketContext =
  createContext<ITicketContext>(defaultContextValues);

export const TicketProvider: FC = ({ children }: any) => {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);

  return (
    <TicketContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketContext.Provider>
  );
};
