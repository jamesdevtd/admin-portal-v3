import React, { useEffect, useState } from 'react'
import { FiYoutube } from 'react-icons/fi';

import styles from './VideoLink.module.scss';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getFieldById, updateField } from '@/features/eventCreation/eventPublicPageSlice';
import { useDebounce } from '@/utils/customHooks';
import { getYoutubeId, youtubeUrl } from '@/utils/regex';

import YoutubeEmbed from './YoutubeEmbed';

type Props = {
  fieldId: number,
  isReadOnly?: boolean
}

export default function YoutubeLink({ fieldId, isReadOnly }: Props) {
  const dispatch = useAppDispatch();
  const itemState = useAppSelector(getFieldById(fieldId));
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
        id: fieldId, type: 'video', data: { youtubeId: id, url: val }
      }));
    } else {
      dispatch(updateField({
        id: fieldId, type: 'video', data: { youtubeId: '', url: val }
      }));
    }
  }

  useEffect(() => {
    if (debouncedValue) {
      handleYoutubeLinkvalue(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className={styles.VideoLink} data-id={fieldId}>
      {!isReadOnly &&
        <div className="box-input">
          <FiYoutube />
          <input
            defaultValue={itemState?.data.url}
            type="text"
            placeholder='Video URL (Vimeo &amp; YouTube links currently supported)'
            onChange={handleLinkChange}
            className={isReadOnly ? 'hidden' : ''}
          />

        </div>
      }
      {itemState?.data.youtubeId &&
        <YoutubeEmbed embedId={itemState.data.youtubeId} />
      }
    </div>
  )
}