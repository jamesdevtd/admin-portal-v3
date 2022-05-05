import React, { useEffect, useState } from 'react'
import { FiYoutube } from 'react-icons/fi';

import { useAppDispatch } from '@/app/hooks';
import { useDebounce } from '@/utils/customHooks';
import { getYoutubeId, youtubeUrl } from '@/utils/regex';

import YoutubeEmbed from './YoutubeEmbed';

type Props = {
  itemId?: number,
}

export default function YoutubeLink({ itemId }: Props) {
  const dispatch = useAppDispatch();
  // const itemState = useAppSelector(getItemById(itemId));
  const [link, setLink] = useState('');
  const [testImg, setTestImg] = useState('');
  const [id, setId] = useState('');

  const debouncedValue = useDebounce<string>(link, 500);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLink(val);
  }

  function validateYoutubeUrl(url: string) {
    if (youtubeUrl.test(url)) {
      return true;
    } else {
      console.log('Invalid youtube url');
    }
  }

  useEffect(() => {
    validateYoutubeUrl(debouncedValue);
    const id = getYoutubeId(debouncedValue);
    if (validateYoutubeUrl(debouncedValue)) {
      setId(id);
    } else {
      setId('');
    }
  }, [debouncedValue]);

  return (
    <div className='YoutubeLink'>
      <div className="box-input">
        <FiYoutube />
        <input
          type="text"
          placeholder='Video URL (Vimeo &amp; YouTube links currently supported)'
          onChange={handleLinkChange}
        />

      </div>
      {id &&
        <YoutubeEmbed embedId={id} />
      }
    </div>
  )
}