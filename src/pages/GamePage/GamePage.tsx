import { Row } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Board } from '../../components/Board';
import { ExtraLives } from './components/ExtraLives';
import { GameOver } from './components/GameOver';
import { GhostsGameView } from './components/GhostsView';
import { MazeView } from './components/MazeView';
import { PacManView } from './components/PacManView';
import { PillsView } from './components/PillsView';
import { Score } from './components/Score';
import { useStore } from '../../components/StoreContext';
import { useKeyboardActions } from './components/useKeyboardActions';
import { VSpace } from '../../components/Spacer';
import { useGameLoop } from '../../model/useGameLoop';
import { RestartView } from './components/RestartView';
import { PauseView } from './components/PauseView';

export const GamePage: React.FC = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.resetGame();
    return () => {
      store.game.gamePaused = true;
    };
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  useGameLoop();
  useKeyboardActions();

  return (
    <Layout data-testid="GamePage">
      <div>
        <ScoreArea>
          <RestartView />
          <Row justify="center">
            <Score />
          </Row>
          <PauseView />
        </ScoreArea>
        <VSpace size="small" />
        <BoardArea>
          <Board>
            <MazeView />
            <PillsView />
            <PacManView />
            <GhostsGameView />
            <GameOver />
          </Board>
          <VSpace size="large" />
          <Row justify="center">
            <ExtraLives />
          </Row>
        </BoardArea>
      </div>
    </Layout>
  );
});

const Layout = styled.div`
  margin: 16px;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const ScoreArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoardArea = styled.div`
  position: relative;
`;
