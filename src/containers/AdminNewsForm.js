import React, {
    useState,
    useEffect,
  } from 'react';
import {
  useParams
} from "react-router-dom";
import _ from 'lodash';
import { withI18n } from 'react-i18next';

import { Input, Button } from 'antd';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { getAccessToken } from '../services/TokenServices';

const AdminNews = (props) => {
  const {
    t,
    history,
  } = props;
  const { news_id } = useParams();
  const [title, setTitle] = useState('');
  const [data, setData] = useState('');

  const submitNew = () => {
    console.log(title);
    console.log(data);
    history.push('/admin/news');
  }

  useEffect(() => {
      console.log(news_id);
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1
          style={{
            marginTop: '-35px',
            marginBottom: '30px',
            fontWeight: 'bold',
            fontSize: '1.5em',
          }}
        >
          {
            news_id === 'create' ? t('create_news') : t('edit_news')
          }
        </h1>
        <div>{t('news_title')}:</div>
        <br />
        <Input
          value={title}
          onChange={evt => setTitle(evt.currentTarget.value)}
        />
        <br />
        <br />
        <div>{t('news_body')}:</div>
        <br />
        <CKEditor
          editor={ ClassicEditor }
          config={{
            simpleUpload: {
              // The URL the images are uploaded to.
              uploadUrl: 'https://api-fujiwara-v2.herokuapp.com/uploads',

              // Headers sent along with the XMLHttpRequest to the upload server.
              headers: {
                Authorization: `Bearer ${getAccessToken()}`
              }
            }
          }}
          onChange={ ( event, editor ) => {
              setData(editor.getData());
              console.log(editor.getData());
          } }
        />
      </div>
      <br />
      <br />
      <div>
        <Button
          style={{
            width: 120,
            marginRight: 15,
          }}
          type="primary"
          onClick={submitNew}
        >
          {t('add_news')}
        </Button>
        <Button
          style={{
            width: 120,
          }}
          onClick={() => history.push('/admin/news')}
        >
          {t('back')}
        </Button>
      </div>
      {/* <div style={{ width: '100%' }} className="content" dangerouslySetInnerHTML={{__html: data}}></div> */}
    </React.Fragment>
  );
};

export default withI18n()(AdminNews);