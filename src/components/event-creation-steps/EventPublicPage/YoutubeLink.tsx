import React, { useEffect, useState } from 'react'
import { FiYoutube } from 'react-icons/fi';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getFieldById, updateField } from '@/features/eventCreation/eventPublicPageSlice';
import { useDebounce } from '@/utils/customHooks';
import { getYoutubeId, youtubeUrl } from '@/utils/regex';

import YoutubeEmbed from './YoutubeEmbed';

type Props = {
  itemId: number,
}

export default function YoutubeLink({ itemId }: Props) {
  const dispatch = useAppDispatch();
  const itemState = useAppSelector(getFieldById(itemId));
  const [link, setLink] = useState(itemState?.data.url);

  // TEST: 
  // sample youtube urls:
  // https://www.youtube.com/watch?v=J1TQLPfctpc
  // https://www.youtube.com/watch?v=YL8OUWxCtXs

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

  function handleYoutubeLinkvalue(val: string) {
    const id = getYoutubeId(val);
    if (validateYoutubeUrl(val)) {
      dispatch(updateField({
        id: itemId, data: { youtubeId: id, url: val }
      }));
    } else {
      dispatch(updateField({
        id: itemId, data: { youtubeId: '', url: val }
      }));
    }
  }

  useEffect(() => {
    if (debouncedValue) {
      handleYoutubeLinkvalue(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className='YoutubeLink'>
      <div className="box-input">
        <FiYoutube />
        <input
          defaultValue={itemState?.data.url}
          type="text"
          placeholder='Video URL (Vimeo &amp; YouTube links currently supported)'
          onChange={handleLinkChange}
        />

      </div>
      {itemState?.data.youtubeId &&
        <YoutubeEmbed embedId={itemState.data.youtubeId} />
      }
    </div>
  )
}