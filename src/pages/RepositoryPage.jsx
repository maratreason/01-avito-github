import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import RepositoryService from "../api/RepositoryService";
import {useFetching} from "../hooks/useFetching";

import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
        margin: "100px 0",
    },
    languageList: {
        listStyle: "none",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "15px 0",
    },
    languageListItem: {
        marginRight: 5,
        marginBottom: 5,
        padding: "10px 17px",
        background: "linear-gradient(45deg, #f1f1f1 30%, #f8f8f8 90%)",
        color: "#a8a8a8",
        borderRadius: 5,
    },
    contributorsListItem: {
        marginRight: 5,
        marginBottom: 5,
        padding: "5px 7px",
        background: "linear-gradient(45deg, #f1f1f1 30%, #f8f8f8 90%)",
        color: "#a8a8a8",
        borderRadius: 5,
    },
    rating: {
        display: "flex",
        flexDirection: "column",
        margin: "2rem 0",
    },
    center: {
        textAlign: "center",
    },
    starsCellText: {
        fontSize: "1.5rem",
    }
}));

const RepositoryPage = () => {
    const classes = useStyles();
    const params = useParams();
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
                        title={<Link href={user.html_url}>{repo.name}</Link>}
                        subheader={
                            "Последний коммит: " +
                            new Date(repo.pushed_at).toLocaleTimeString() +
                            " (" +
                            new Date(repo.pushed_at).toLocaleDateString() +
                            "г.)"
                        }
                    ></CardHeader>
                    <CardMedia className={classes.media} image={avatar} title={repo.name} />
                    <CardContent className={classes.center}>
                        <Link style={{margin: "0 auto"}} variant="h3" color="textSecondary" component={Link} href={user.html_url}>
                            {user.login}
                        </Link>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {repo.description}
                        </Typography>
                        <div className={classes.rating}>
                            <Typography className={classes.center} variant="body2" color="textSecondary" component="p">
                                Количество звезд:
                            </Typography>
                            <Rating style={{margin: "0 auto"}} name="customized-10" defaultValue={10} max={10} />
                            <div className={[classes.starsCellText, classes.center].join(" ")}>{repo.stargazers_count}</div>
                        </div>
                        <Typography className={classes.center} variant="body2" color="textSecondary" component="p">
                            Список языков программирования:
                        </Typography>
                        <ul className={classes.languageList}>
                            {languages && Object.keys(languages).map((key) => {
                                return (<li key={key} className={classes.languageListItem}>{key}</li>);
                            })}
                        </ul>
                        
                        <Typography variant="body2" color="textSecondary" component="p">
                            Список контрибьютеров:
                        </Typography>
                        <ul className={classes.languageList}>
                            {contributors && contributors.map((contr) => {
                                return (<li key={contr.id} className={classes.contributorsListItem}>{contr.login}</li>);
                            })}
                        </ul>
                    </CardContent>
                </Card>
            ) : (
                ""
            )}
        </div>
    );
};

export default RepositoryPage;
