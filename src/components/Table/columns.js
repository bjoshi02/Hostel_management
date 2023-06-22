import { format } from 'date-fns';

export const COLUMNS = [
  {
    Header: 'Student Id',
    Footer: 'Student Id',
    accessor: 'id',
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Room Allocated',
    Footer: 'Room Allocated',
    accessor: 'room_allocated',
  },
  // {
  //   Header: 'Last Updated',
  //   Footer: 'Last Updated',
  //   accessor: 'last_updated',
  //   Cell: ({ value }) => {
  //     return format(new Date(value), 'dd/MM/yyyy')
  //   }
  // },
  {
    Header: 'Status',
    Footer: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Details',
    Footer: 'Details',
    accessor: 'details'
  },
]
