import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withI18n } from "react-i18next";
import _ from "lodash";
import { Link, useParams } from "react-router-dom";
import "../../assets/news_detail.css";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { getNews, getNewsDetails } from "../../services/NewsServices";
import { message, Skeleton } from "antd";

import { parseISOString } from "../../utils";

const ProductDetail = props => {
  const shouldWrap = useMediaQuery("(min-width:690px)");

  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: 10,
      maxWidth: "100%",
      display: "flex",
      marginBottom: "50px"
    },
    card: {
      maxWidth: 300,
      width: 345
    },
    cardInside: {
      height: 345
    },
    media: {
      height: 140
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    linkDecoration: {
      color: "inherit",
      textDecoration: "none",
      margin: 25
    }
  }));
  const { t } = props;
  const { news_id } = useParams();
  const classes = useStyles();

  const [articleInfo, setArticleInfo] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isPageLoading, setPageLoading] = useState(false);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const getRelatedNews = params => {
    const data = {
      offset: 0,
      limit: 3,
      order: "desc",
      sort: "createdAt",
      ...params
    };
    setRelatedLoading(true);
    getNews(data)
      .then(res => {
        setRelatedArticles([...relatedArticles, ..._.get(res, "data.data")]);
        setRelatedLoading(false);
      })
      .catch(() => {
        setRelatedLoading(false);
      });
  };

  useEffect(() => {
    getRelatedNews();
  }, []);

  useEffect(() => {
    console.log(news_id);
    setPageLoading(true);
    getNewsDetails(news_id)
      .then(res => {
        setArticleInfo(_.get(res, "data.data"));
        setPageLoading(false);
      })
      .catch(() => {
        setPageLoading(false);
        message.error(`Couldn't load article. Please try to reload the page`);
      });
  }, [news_id]);

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "75px"
        }}
      >
        <Skeleton loading={isPageLoading} active paragraph={{ rows: 8 }}>
          <div
            style={{
              display: "flex",
              width: shouldWrap ? "60%" : "90%",
              alignSelf: "center",
              WebkitJustifyContent: "center",
              flexDirection: "column"
            }}
          >
            <h1 style={{ fontSize: 40, marginBottom: 35 }}>
              {_.get(articleInfo, "title")}
            </h1>
            <div
              style={{ width: "100%" }}
              className="content"
              dangerouslySetInnerHTML={{
                __html: _.get(articleInfo, "content")
              }}
            ></div>
          </div>
          <div
            style={{
              marginTop: 55,
              width: "80%",
              alignSelf: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <h1 style={{ marginLeft: 7, fontSize: 25, fontWeight: 700 }}>
                {t("more")}
              </h1>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "gray",
                  opacity: 0.2,
                  marginLeft: 5,
                  marginRight: 5,
                  marginBottom: 25
                }}
              ></div>
            </div>
            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.root}
            >
              {relatedArticles.map(value => (
                <Link
                  key={_.get(value, "_id")}
                  to={`/news/${_.get(value, "_id")}`}
                  className={classes.linkDecoration}
                >
                  <Grid key={_.get(value, "_id")} xs={12} item>
                    <Card className={classes.card}>
                      <CardActionArea className={classes.cardInside}>
                        <CardMedia
                          className={classes.media}
                          component="img"
                          src={`${process.env.REACT_APP_API_URL}/static/${_.get(
                            value,
                            "thumbnail"
                          )}`}
                          title="Title"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h4"
                            className="title"
                          >
                            {_.get(value, "title")}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className="description"
                          >
                            {_.get(value, "description")}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            component="p"
                            className="hour"
                          >
                            {parseISOString(_.get(value, "createdAt"))}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Link>
              ))}
            </Grid>
          </div>
        </Skeleton>
      </div>
    </React.Fragment>
  );
};

ProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
};

export default withI18n()(ProductDetail);
