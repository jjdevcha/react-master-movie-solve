import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import {motion, useAnimation, useMotionValueEvent, useScroll} from "framer-motion";
import { useState } from "react";

const Categories = styled(motion.ul)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
  position: fixed;
  top: 0;
  font-size: 20px;
  padding: 20px 60px;
  color:  rgba(255, 255, 255, 1);
  width: 100%;
`;

const Category = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: rgba(255, 255, 255, 1);
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    bottom: -5px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: rgba(255, 0, 0, 1);
`;

const catVars = {
    top: {
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    scroll: {
        backgroundColor: "rgba(0, 0, 0, 1)",
    },
};


export default function Header() {
    const popularMatch = useMatch("/");
    const comingMatch = useMatch("/coming-soon");
    const nowMatch = useMatch("/now-playing");
    const categoryAnimation = useAnimation();
    const {scrollY} = useScroll();
    
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 80) {
            categoryAnimation.start("scroll");
        } else {
            categoryAnimation.start("top");
        }
    })

    return (
        <Categories variants={catVars} animate={categoryAnimation} initial={"top"}>
            <Category>
                <Link to="/">
                    POPULAR
                    {popularMatch && <Circle layoutId="cirlcle" />}
                </Link>
            </Category>
            <Category>
                <Link to="/coming-soon">
                    COMING SOON
                    {comingMatch && <Circle layoutId="cirlcle" />}
                </Link>
            </Category>
            <Category>
                <Link to="/now-playing">
                    NOW PLAYING
                    {nowMatch && <Circle layoutId="cirlcle" />}
                </Link>
            </Category>
        </Categories>
    )

}