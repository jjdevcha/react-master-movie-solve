import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate, PathMatch } from "react-router-dom";

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
    width: 65vw;
    height: 80vh: 
    background-color: ${(props) => props.theme.black.lighter};
    overflow: hidden;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    margin: 0 auto;
`;

const BigThumbnail = styled.div`
    background: cover center center;
`;

const BigTitle = styled.h1`
    color: ${(props) => props.theme.white.lighter}
`;

const BigOverview = styled.p`
    color: ${(props) => props.theme.white.lighter}
`

export default function Modal() {

    const moviePathMatch: PathMatch<string> | null = useMatch("/movie/:id");
    console.log(moviePathMatch);
    return (
        <AnimatePresence>
            {moviePathMatch ? (
                <>
                    <Overlay 
                        exit={{opacity: 0}}
                        animate={{opacity: 1}}    
                    />
                    <MovieModal layoutId={moviePathMatch.params.id}>
                        <BigTitle></BigTitle>
                        <BigOverview></BigOverview>
                    </MovieModal>
                </>
            ) : null}
        </AnimatePresence>
    )
}