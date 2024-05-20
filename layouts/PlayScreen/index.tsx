"use client";

import Board from "@/components/board";
import Score from "@/components/score";
import styles from "@/styles/index.module.css";
const PlayScreen = () => {
  return (
    <div className={styles.twenty48}>
      <h1>2048</h1>
      <Score />
      <main>
        <Board />
      </main>
    </div>
  );
};

export default PlayScreen;
