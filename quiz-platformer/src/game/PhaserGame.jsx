import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

function MazeGame() {
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    let score = 0;
    let currentLevel = 0;
    let game;

    const levelMaps = [
      [
        '11111111111111111111',
        '10000000000000000001',
        '10111111111110111101',
        '10100000100010100001',
        '10101110101010101111',
        '10101000101010000001',
        '10101011101011111001',
        '10101010000000001001',
        '10111010111111011001',
        '10000010100000001001',
        '10111110101111101001',
        '10100000101000101001',
        '10101111101010101001',
        '10100000001010101001',
        '10111111111010101111',
        '10000000000010000031',
        '11111111111211111111'
      ],
      [
        '11111111111111111111',
        '10000000000000000001',
        '10111111111111111001',
        '10000000000000001001',
        '10111111111111001001',
        '10100000000001001001',
        '10101111111001001001',
        '10101000001001001001',
        '10101011101001111001',
        '10101010001000000001',
        '10101010111111111011',
        '10101010000000000001',
        '10101111111111111011',
        '10000000000000000001',
        '10111111111111111001',
        '10200000000000000031',
        '11111111111111111111'
      ],
      [
        '11111111111111111111',
        '10000000000000000001',
        '10111111111111111001',
        '10000000000000001001',
        '11111111111111001001',
        '10000000000001001001',
        '10111111111001001001',
        '10100000001001001001',
        '10101111101001111001',
        '10101000101000000001',
        '10101010111111111011',
        '10101010000000000001',
        '10101111111111111011',
        '10000000000000000001',
        '11111111111111111001',
        '10200000000000000031',
        '11111111111111111111'
      ],
      [
        '11111111111111111111',
        '10000000000000000001',
        '10111111111111111001',
        '10100000000000001001',
        '10101111111111001001',
        '10101000000001001001',
        '10101011111001001001',
        '10101010001001001001',
        '10101010101001111001',
        '10101010001000000001',
        '10101010111111111011',
        '10101010000000000001',
        '10101111111111111011',
        '10000000000000000001',
        '10111111111111111001',
        '10200000000000000031',
        '11111111111111111111'
      ],
      [
        '11111111111111111111',
        '10000000000000000001',
        '10111111111111111001',
        '10000000000000001001',
        '10111111111111001001',
        '10100000000001001001',
        '10101111111001001001',
        '10101000001001001001',
        '10101011101001111001',
        '10101010001000000001',
        '10101010111111111011',
        '10101010000000000001',
        '10101111111111111011',
        '10000000000000000001',
        '11111111111111111001',
        '10200000000000000031',
        '11111111111111111111'
      ]
    ];

    const levelQuestions = [
      // Level 1 Questions
      {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
      },
      {
        question: "What is 5 × 7?",
        answers: ["25", "30", "35", "40"],
        correct: 2
      },
      {
        question: "Who painted the Mona Lisa?",
        answers: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"],
        correct: 2
      },

      // Level 2 Questions
      {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Gd", "Au", "Ag"],
        correct: 2
      },
      {
        question: "Which ocean is the largest?",
        answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
        correct: 2
      },
      {
        question: "What is the square root of 64?",
        answers: ["6", "7", "8", "9"],
        correct: 2
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        correct: 2
      },

      // Level 3 Questions
      {
        question: "What is the main component of the Sun?",
        answers: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon"],
        correct: 1
      },
      {
        question: "Which country is home to the kangaroo?",
        answers: ["South Africa", "Brazil", "Australia", "India"],
        correct: 2
      },
      {
        question: "Solve: 12 + 8 × 2",
        answers: ["40", "28", "20", "32"],
        correct: 1
      },
      {
        question: "Who discovered gravity?",
        answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
        correct: 1
      },

      // Level 4 Questions
      {
        question: "What is the hardest natural substance on Earth?",
        answers: ["Gold", "Iron", "Diamond", "Quartz"],
        correct: 2
      },
      {
        question: "Which language has the most native speakers?",
        answers: ["English", "Spanish", "Hindi", "Mandarin Chinese"],
        correct: 3
      },
      {
        question: "What is 3/4 expressed as a decimal?",
        answers: ["0.25", "0.5", "0.75", "1.0"],
        correct: 2
      },
      {
        question: "Who invented the telephone?",
        answers: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        correct: 1
      },

      // Level 5 Questions
      {
        question: "Which gas is most abundant in Earth's atmosphere?",
        answers: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct: 2
      },
      {
        question: "What is the largest mammal?",
        answers: ["Elephant", "Blue whale", "Giraffe", "Polar bear"],
        correct: 1
      },
      {
        question: "What is 10² + 5²?",
        answers: ["100", "125", "150", "175"],
        correct: 1
      },
      {
        question: "Who developed the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Marie Curie"],
        correct: 1
      }
    ];

    const sounds = {
      correct: new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg'),
      wrong: new Audio('https://actions.google.com/sounds/v1/cartoon/boing.ogg'),
      unlock: new Audio('https://actions.google.com/sounds/v1/cartoon/pop.ogg'),
      bonus: new Audio('https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum_hit.ogg'),
    };

    class MazeScene extends Phaser.Scene {
      constructor() {
        super('MazeScene');
      }

      preload() {
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
      }

      create() {
        this.tileSize = 32;
        this.questionsAnswered = 0;
        this.bonusTriggered = false;

        const map = levelMaps[currentLevel];
        this.walls = this.physics.add.staticGroup();
        let doorPosition = null;

        map.forEach((row, y) => {
          row.split('').forEach((cell, x) => {
            const worldX = x * this.tileSize;
            const worldY = y * this.tileSize;

            if (cell === '1') {
              const wall = this.add.rectangle(worldX, worldY, this.tileSize - 6, this.tileSize - 6, 0x29484e).setOrigin(0);
              this.physics.add.existing(wall, true);
              this.walls.add(wall);
            }
            if (cell === '2') {
              // Blue square door
              this.door = this.add.rectangle(worldX + 16, worldY + 16, this.tileSize - 6, this.tileSize - 6, 0x0000ff).setOrigin(0.5);
              this.physics.add.existing(this.door, true);
            }
            if (cell === '3') {
              this.star = this.add.circle(worldX + 16, worldY + 16, 12, 0x37f265);
              this.physics.add.existing(this.star, true);
            }
          });
        });

        this.player = this.physics.add.sprite(40, 40, 'player').setScale(0.6);
        this.physics.add.collider(this.player, this.walls);

        if (this.door) {
          this.physics.add.overlap(this.player, this.door, () => this.checkQuizProgress(), null, this);
        }

        if (this.star) {
          this.physics.add.overlap(this.player, this.star, () => this.triggerBonus(), null, this);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(650, 10, `Level ${currentLevel + 1}`, {
          fontSize: '18px',
          fill: '#29484e',
          fontFamily: 'Courier New',
        }).setScrollFactor(0);
      }

      update() {
        const speed = 150;
        this.player.setVelocity(0);
        if (this.cursors.left.isDown) this.player.setVelocityX(-speed);
        else if (this.cursors.right.isDown) this.player.setVelocityX(speed);
        if (this.cursors.up.isDown) this.player.setVelocityY(-speed);
        else if (this.cursors.down.isDown) this.player.setVelocityY(speed);
      }

      checkQuizProgress() {
        if (this.questionsAnswered < 3) {
          this.askQuestion();
        } else {
          sounds.unlock.play();
          this.door.destroy();
          showPopup('Door Unlocked!', () => {
            currentLevel++;
            if (currentLevel < levelMaps.length) {
              this.scene.restart();
            } else {
              setFinalScore(score);
            }
          });
        }
      }

      askQuestion() {
        this.scene.pause();
        const index = currentLevel * 4 + this.questionsAnswered;
        const questionData = levelQuestions[index];
        
        showQuiz(questionData.question, questionData.answers, (answerIndex) => {
          if (answerIndex === questionData.correct) {
            score += 10;
            this.questionsAnswered++;
            sounds.correct.play();
          } else {
            score -= 5;
            sounds.wrong.play();
          }
          this.scene.resume();
        });
      }

      triggerBonus() {
        if (!this.bonusTriggered) {
          this.bonusTriggered = true;
          this.star.destroy();
          const index = currentLevel * 4 + 3;
          const questionData = levelQuestions[index];
          this.scene.pause();
          showQuiz(questionData.question, questionData.answers, (answerIndex) => {
            if (answerIndex === questionData.correct) {
              score += 20;
              sounds.bonus.play();
            } else {
              sounds.wrong.play();
            }
            this.scene.resume();
          });
        }
      }
    }

    function showPopup(text, onClose) {
      const box = document.getElementById('quizBox');
      const q = document.getElementById('questionText');
      const opts = document.getElementById('options');
      q.textContent = text;
      opts.innerHTML = '';
      const btn = document.createElement('button');
      btn.textContent = 'Continue';
      btn.onclick = () => {
        box.style.display = 'none';
        if (onClose) onClose();
      };
      btn.style.padding = '10px';
      btn.style.backgroundColor = '#29484e';
      btn.style.color = '#fff';
      opts.appendChild(btn);
      box.style.display = 'block';
    }

    function showQuiz(question, options, callback) {
      const box = document.getElementById('quizBox');
      const q = document.getElementById('questionText');
      const opts = document.getElementById('options');
      q.textContent = question;
      opts.innerHTML = '';
      options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => {
          box.style.display = 'none';
          callback(index);
        };
        btn.style.margin = '10px 0';
        btn.style.padding = '10px';
        btn.style.width = '100%';
        btn.style.backgroundColor = '#37f265';
        btn.style.border = 'none';
        btn.style.fontWeight = 'bold';
        opts.appendChild(btn);
      });
      box.style.display = 'block';
    }

    game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#e0ddcc',
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: MazeScene
    });

    return () => game.destroy(true);
  }, []);

  return (
    <>
      <div id="game-container" style={{ width: '800px', height: '600px', margin: '0 auto' }}></div>
      <div id="quizBox" style={{
        display: 'none',
        position: 'absolute',
        top: '25%',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#e0ddcc',
        border: '5px solid #37f265',
        padding: '30px',
        borderRadius: '10px',
        zIndex: 999,
        fontFamily: 'Courier New, monospace',
        width: '400px',
        textAlign: 'center',
        color: '#29484e'
      }}>
        <div id="questionText" style={{ marginBottom: '15px', fontWeight: 'bold', color: '#29484e' }}>Question</div>
        <div id="options"></div>
      </div>
      {finalScore !== null && (
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          border: '5px solid #37f265',
          padding: '40px',
          borderRadius: '15px',
          fontFamily: 'Courier New, monospace',
          textAlign: 'center',
          zIndex: 1000,
          color: '#29484e',
          width: '350px'
        }}>
          <h2>🎉 You completed the maze!</h2>
          <p>Your Final Score:</p>
          <h1 style={{ fontSize: '2em' }}>{finalScore}</h1>
        </div>
      )}
    </>
  );
}

export default MazeGame;