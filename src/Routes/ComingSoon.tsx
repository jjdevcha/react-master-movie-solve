import { useQuery } from "@tanstack/react-query"
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IAPIResponse, IMovieDetail, getComingSoon, getMovie, makeBgPath, makeImagePath } from "../api";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";


const Wrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 70px;
color: ${(props) => props.theme.white.lighter};
`;

const Loader = styled.div`
height: 20vh;
display: flex;
justify-content: center;
align-items: center;
`;

const Cards = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    width: 900px;
    gap: 20px;
`

const Card = styled(motion.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
`

const Thumbnail = styled(motion.div)<{tphoto: string}>`
    width: 200px;
    height: 300px;
    background-image: url(${(props) => props.tphoto});
    background-size: cover;
    background-position: center center;
    border-radius: 20px;
`;

const Title = styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.white.lighter};
    height: 20px;
    margin: 20px auto;
`

const Overlay = styled(motion.div)`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgba(0,0,0,0.5);
    opacity: 0;
`;

const MovieModal = styled(motion.div)`
    border-radius: 20px;
    width: 70%;
    height: 80%: 
    background-color: ${(props) => props.theme.black.dark};
    overflow: hidden;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 100;
`;

const BigThumbnail = styled.div`
    background-size: cover; 
    background-position: center center;
    width: 100%;
    height: 400px;
`;

const BigTitle = styled.h1`
    color: ${(props) => props.theme.white.lighter};
    font-size: 50px;
    padding: 20px;
    position: relative;
    top: -80px;
`;

const BigOverview = styled.p`
    color: ${(props) => props.theme.white.lighter};
    padding: 10px 20px;
    position: relative;
    top: -80px;
`

const BigDetail = styled.p`
    color: ${(props) => props.theme.white.lighter};
    padding: 5px 20px;
    position: relative;
    top: -50px;
`

const thumbnailVars = {
    hover: {
        scale: 1.1, 
        y: -10
    }
}
 

export default function ComingSoon() {
    const { data, isLoading } = useQuery<IAPIResponse>({
        queryKey: ["coming-soon"],
        queryFn: getComingSoon,
    });
    const navigate = useNavigate();
    const moviePathMatch: PathMatch<string> | null = useMatch("/movie/:id");
    const movieId = moviePathMatch?.params.id;
    const {data: detailData} = useQuery<IMovieDetail>({
        queryKey: ["detailComing", movieId],
        queryFn: () => getMovie(String(movieId)),
    })
    const onCardClicked = (id: number) => {
        navigate(`/movie/${id}`)
    }
    const onCloseModal = () => navigate("/coming-soon");
    const clickedMovie = movieId && data?.results.find((movie) => movie.id === Number(movieId));

    return (
        <Wrapper>
            { isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                <Cards>
                    {data?.results.map((movie) => (
                        <Card 
                            layoutId={movie.id + "c"}
                            onClick={() => onCardClicked(movie.id)}
                            key={movie.id}>
                            <Thumbnail variants={thumbnailVars} whileHover="hover" tphoto={makeImagePath(movie.backdrop_path || "")}/>
                            <Title>{movie.title}</Title>
                        </Card>
                    ))}
                </Cards>
                <AnimatePresence>
                            {moviePathMatch ? (
                                <>
                                    <Overlay 
                                        onClick={onCloseModal}
                                        exit={{opacity: 0}}
                                        animate={{opacity: 1}}    
                                    />
                                    <MovieModal layoutId={moviePathMatch.params.id + "c"} style={{backgroundColor: "rgba(0,0,0,1"}}>
                                        {clickedMovie && (
                                            <>
                                                <BigThumbnail style={{backgroundImage: `linear-gradient(to top, black, transparent),
                                                url(${makeBgPath(clickedMovie.backdrop_path || "")})`}} />
                                                <BigTitle>{clickedMovie.title}</BigTitle>
                                                <BigOverview>{clickedMovie.overview}</BigOverview>
                                                <BigDetail>Budget: ${detailData?.budget}</BigDetail>
                                                <BigDetail>Revenue: ${detailData?.revenue}</BigDetail>
                                                <BigDetail>Runtime: {detailData?.runtime} minutes</BigDetail>
                                                <BigDetail>Rating: {detailData?.vote_average}</BigDetail>
                                                <BigDetail>Homepage: {detailData?.homepage}</BigDetail>
                                            </>
                                        )}
                                    </MovieModal>
                                </>
                            ) : null}
                        </AnimatePresence>
                </>
            )}
        </Wrapper>
    )
}