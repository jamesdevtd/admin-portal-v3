import { useState } from "react";

import { useAppDispatch } from "@/app/hooks";

import ChevronIcon from '~/icons/chevron-down.svg';


type Props = {
  monthId: number,
  name: string,
}

export default function ClonedEventEditor({ monthId, name }: Props) {
  const dispatch = useAppDispatch();
  // const clone = useAppSelector(getClonedEventbyId(cloneId));
  // const event = useAppSelector(getClonedEventbyId(cloneId));

  const [expand, setExpand] = useState(true);

  return (
    <div className={`item ${expand ? 'expanded' : 'collapsed'}`}>
      <h3 onClick={(e) => {
        e.preventDefault();
        setExpand(!expand);
      }}>
        <span>{name}</span>
        <ChevronIcon />
      </h3>
    </div>
  )
}