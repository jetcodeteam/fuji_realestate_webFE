import React, { useEffect, useState } from "react";
import { withI18n } from "react-i18next";
import { Link } from "react-router-dom";
import _ from "lodash";
import "../../assets/news.css";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import LinearProgress from "@material-ui/core/LinearProgress";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { BackTop } from "antd";

import { pagination } from "../../configs/constants";
import { getNews } from "../../services/NewsServices";

const NewsPage = props => {
  const { t } = props;
  const matches = useMediaQuery("(min-width:613px)");

  const [tableData, setTableData] = useState([]);
  const [isTableLoading, setTableLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterData, setFilterData] = useState({});

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  const getNewsList = (offset, isLoadmore) => {
    const data = {
      offset: offset,
      limit: pagination.limit,
      order: "desc",
      sort: "createdAt",
      filter: filterData,
    };
    setTableLoading(true);
    getNews(data)
      .then(res => {
        if (isLoadmore) {
          setTableData([...tableData, ..._.get(res, "data.data")]);
        } else {
          setTableData(_.get(res, "data.data"));
        }
        setTableLoading(false);
        setTotalPage(
          parseInt(
            _.get(res, "headers['content-range']", "0/0").split("/")[1]
          ) / data.limit
        );
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    getNewsList(0, true);
    document.title = "Latest Real Estate News";
  }, []);

  console.log(tableData);

  const loadMore = () => {
    const offset = currentPage * pagination.limit;
    setCurrentPage(currentPage + 1);
    getNewsList(offset, true);
  };

  useEffect(() => {
    const searchState = { "$regex": `${searchTerm}`, "$options": "i" };
    let tabbleStates = filterData;
    tabbleStates["title"] = searchState;
    setFilterData(filterData);
    getNewsList(0, false)
  }, [searchTerm])

  const useStyles = makeStyles(theme => ({
    newsfeed: {
      marginTop: "30%"
    },
    subCard: {
      display: "flex",
      width: 300
    },
    subDetails: {
      display: "flex",
      flexDirection: "column"
    },
    subContent: {},
    subCover: {
      width: 150,
      margin: "10px",
      height: 100,
      objectFit: "contain"
    },
    root: {
      display: "flex"
    },
    card: {
      display: "flex",
      width: "100%"
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    media: {
      height: 140
    },
    cover: {
      width: "30vw",
      height: 177.67,
      margin: "10px"
    },
    container: {
      display: "flex"
    },
    subtitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: 500
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    linkDecoration: {
      color: "inherit",
      textDecoration: "none"
    },
    newsroot: {
      width: matches ? "90%" : "350px",
      display: "flex"
    },
    filter: {
      width: "80%",
      height: "100px",
      position: "relative",
      display: "flex",
      alignItems: "center",
      margin: matches ? "35px 10% 0px 10%" : "35px 10% 35px 10%",
      flexWrap: "wrap"
    },
    input: {
      display: "flex",
      alignItems: "center",
      width: 320,
      height: 35,
      margin: "15px",
      borderRadius: 30,
      backgroundColor: "rgba(105, 192, 255, 0.27)"
    },
    filterInput: {
      display: "flex",
      alignItems: "center",
      width: 110,
      height: 35,
      margin: "15px",
      borderRadius: 30,
      backgroundColor: "#69C0FF"
    },
    divider: {
      marginBottom: matches ? "50px" : "60px",
      width: "90%",
      margin: "auto"
    }
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <BackTop />
      <div className={classes.filter}>
        <Paper className={classes.input}>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            onChange={handleChange}
            value={searchTerm}
            placeholder={t('search_help')}
            inputProps={{ "aria-label": "search real estates" }}
            style={{ width: "80%" }}
          />
        </Paper>
      </div>
      {isTableLoading ? (
        <LinearProgress className={classes.divider} />
      ) : (
        <Divider variant="middle" className={classes.divider} />
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: 100 }}
      >
        <div className={classes.newsroot}>
          <Grid container className={classes.root}>
            <Grid item sm={12} md={11} className="news_holder">
              <p
                style={{ marginLeft: "12px", fontWeight: 700, fontSize: "2em" }}
              >
                {isTableLoading || t("recent_news")}
              </p>
              <div style={{ marginBottom: "10px" }}></div>
              {tableData.map(value => (
                <Link
                  key={_.get(value, "_id")}
                  to={`news/${_.get(value, "_id")}`}
                  className={classes.linkDecoration}
                >
                  <Grid
                    key={_.get(value, "_id")}
                    style={{ marginBottom: 20 }}
                    item
                  >
                    <Card key={_.get(value, "_id")} className={classes.card}>
                      <CardMedia
                        className={classes.cover}
                        component="img"
                        src={`${process.env.REACT_APP_API_URL}/static/${_.get(
                          value,
                          "thumbnail"
                        )}`}
                        title={value.title}
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography
                            className="subtitle-news"
                            variant="h5"
                            style={{ marginBottom: "10px" }}
                          >
                            {_.get(value, "title")}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            className="subtitle-news"
                          >
                            {_.get(value, "description")}
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </Grid>
                </Link>
              ))}
              {totalPage > currentPage && (
                <Button onClick={loadMore}>{t("more")}...</Button>
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withI18n()(NewsPage);
