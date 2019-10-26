import React, {
    useState,
    useEffect,
  } from 'react';
import {
  useParams
} from "react-router-dom";
import _ from 'lodash';
import { withI18n } from 'react-i18next';
import env from '../configs/environments';

import { Input, Button, Upload, Icon, message } from 'antd';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { getAccessToken } from '../services/TokenServices';
import {
  getNewsDetails,
  createNews,
  updateNews,
} from '../services/NewsServices';

const AdminNews = (props) => {
  const {
    t,
    history,
  } = props;
  const { news_id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState('');
  const [initialData, setInitialData] = useState('');
  const [fileList, setFileList] = useState([]);

  const submitNew = () => {
    if (title && data && fileList) {
      const body = {
        title: title,
        thumbnail: _.get(fileList[0], 'response.filename'),
        content: data,
      }
      if (news_id === 'create') {
        createNews(body)
          .then((res) => {
            history.push('/admin/news');
          })
          .catch(() => {
            message.error(`Couldn't create news`);
          })
      } else {
        updateNews(news_id, body)
          .then((res) => {
            history.push('/admin/news');
          })
          .catch(() => {
            message.error(`Couldn't update news`);
          })
      }
    } else {
      message.error(`All field is required`);
    }
  }

  useEffect(() => {
      if (news_id !== 'create') {
        getNewsDetails(news_id)
          .then((res) => {
            const data = _.get(res, 'data.data');
            const title = _.get(data, 'title');
            setTitle(title);
            const description = _.get(data, 'description');
            setDescription(description);
            const content = _.get(data, 'content');
            setInitialData(content)
            const thumbnail = _.get(data, 'thumbnail');
            setFileList([{
              uid: '1',
              url: `${env.host}/static/` + thumbnail,
              name: 'thumbnail',
              thumbnail: `${env.host}/static/` + thumbnail,
            }]);
          })
      }
  }, []);

  const uploadProps = {
    name: 'upload',
    action: `${env.host}/uploads/`,
    headers: {
      authorization: `Bearer ${getAccessToken()}`,
    },
    fileList: fileList,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList([...info.fileList].slice(-1));
    },
  };

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
        <div>{t('news_description')}:</div>
        <br />
        <Input
          value={description}
          onChange={evt => setDescription(evt.currentTarget.value)}
        />
        <br />
        <br />
        <div>{t('news_thumbnail')}:</div>
        <br />
        <Upload {...uploadProps}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
        <br />
        <br />
        <div>{t('news_body')}:</div>
        <br />
        <CKEditor
          editor={ ClassicEditor }
          data={initialData}
          config={{
            simpleUpload: {
              // The URL the images are uploaded to.
              uploadUrl: `${env.host}/uploads/`,

              // Headers sent along with the XMLHttpRequest to the upload server.
              headers: {
                Authorization: `Bearer ${getAccessToken()}`
              }
            }
          }}
          onChange={ ( event, editor ) => {
              setData(editor.getData());
          } }
        />
      </div>
      <br />
      <br />
      <div style={{ marginBottom: '50px' }}>
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