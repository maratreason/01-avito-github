import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RepositoryService from "../api/RepositoryService";
import {useFetching} from "../hooks/useFetching";

import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {red} from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    languageList: {
        listStyle: "none",
        display: "flex",
        flexWrap: "wrap",
        margin: "15px 0",
    },
    languageListItem: {
        marginRight: 5,
        marginBottom: 5,
        padding: "10px 17px",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        color: "#fff",
        borderRadius: 5,
    },
    contributorsListItem: {
        marginRight: 5,
        marginBottom: 5,
        padding: "5px 7px",
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        color: "#fff",
        borderRadius: 5,
    },
    rating: {
        display: "flex",
        flexDirection: "column",
    }
}));

const RepositoryPage = () => {
    const classes = useStyles();
    const params = useParams();
    const [expanded, setExpanded] = useState(false);
    const [repo, setRepo] = useState({});
    const [avatar, setAvatar] = useState("");
    const [user, setUser] = useState({});
    const [languages, setLanguages] = useState([]);
    const [contributors, setContributors] = useState([]);

    const [fetchPostByName, isLoading, error] = useFetching(async (owner, name) => {
        const {data} = await RepositoryService.getByRepoName(owner, name);
        setRepo(data);
        console.log("repo", data);
    });

    const [fetchRepoUser, isUserLoading, userError] = useFetching(async (name) => {
        const {data} = await RepositoryService.getRepoUser(name);
        setUser(data);
        setAvatar(data.avatar_url);
    });

    const [fetchRepoLanguageUrl, langLoading, langError] = useFetching(async (langUrl) => {
        const {data} = await RepositoryService.getRepoLanguages(langUrl);
        setLanguages(data);
    });

    const [fetchContributors, contrLoading, contrError] = useFetching(async (contrUrl, per_page) => {
        const {data} = await RepositoryService.getRepoContributors(contrUrl, per_page);
        setContributors(data);
    });

    useEffect(() => {
        fetchPostByName(params.owner, params.name);
        fetchRepoUser(params.owner);
    }, []);

    useEffect(() => {
        fetchRepoLanguageUrl(repo.languages_url);
        fetchContributors(repo.contributors_url, 10);
    }, [repo.languages_url]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.wrapper}>
            {!isLoading ? (
                <Card className={classes.root}>
                    <CardHeader
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={<Link href={user.url}>{repo.name}</Link>}
                        subheader={
                            "Последний коммит: " +
                            new Date(repo.pushed_at).toLocaleTimeString() +
                            " (" +
                            new Date(repo.pushed_at).toLocaleDateString() +
                            "г.)"
                        }
                    ></CardHeader>
                    <CardMedia className={classes.media} image={avatar} title={repo.name} />
                    <CardContent>
                        <Link variant="h2" color="textSecondary" component={Link} href={user.url}>
                            {user.login}
                        </Link>
                        <div className={classes.rating}>
                            <div className={classes.starsCellText}>{repo.stargazers_count}</div>
                            <Rating name="customized-10" defaultValue={10} max={10} />
                        </div>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Список языков программирования:
                        </Typography>
                        <ul className={classes.languageList}>
                            {languages && Object.keys(languages).map((key) => {
                                return (<li key={key} className={classes.languageListItem}>{key}</li>);
                            })}
                        </ul>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {repo.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Список контрибьютеров:
                        </Typography>
                        <ul className={classes.languageList}>
                            {contributors && contributors.map((contr) => {
                                return (<li key={contr.id} className={classes.contributorsListItem}>{contr.login}</li>);
                            })}
                        </ul>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ) : (
                ""
            )}
        </div>
    );
};

export default RepositoryPage;
