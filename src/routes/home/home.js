import React, { useState } from 'react';
import * as Styled from './home.styled';

export const Home = () => {

    const emojiGenerator = () => {
        const emojis = ['🎉', '🎊', '✨', '🥰', '😃', '🍀', '😊', '🙌🏻'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    };

    return (
        <Styled.Container>
            <Styled.NameTitle>Ínicio</Styled.NameTitle>
            <Styled.HelloBox>
                <p style={{fontSize: 16, marginLeft: 10, paddingTop: 10}}>
                    Bem vindo ao mflow {emojiGenerator()}{emojiGenerator()}
                </p>
            </Styled.HelloBox>
            <Styled.ContainerData>
            </Styled.ContainerData>
        </Styled.Container>
    );
}
