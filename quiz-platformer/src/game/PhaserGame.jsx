import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';

function MazeGame() {
  const [finalScore, setFinalScore] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        '10101000000000001001',
        '10111010111111011001',
        '10100010100000001001',
        '10111110101111101001',
        '10100000101000101001',
        '10101111101010101001',
        '10120000001010101001',
        '11111111111010101011',
        '10000000000010000031',
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
        '10101111111111111111',
        '10000000000000000001',
        '11111111111111111001',
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
        '11101111111111111011',
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
        '10101010111111111111',
        '10101010000000000001',
        '10101011111111111111',
        '10100000000000000001',
        '11111111111111111001',
        '10200000000000000031',
        '11111111111111111111'
      ],
      [
        '11111111111111111111',
        '10000000000000000001',
        '11111111111111111001',
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
      // Level 1 - Mandatory (3 questions)
      {
        question: "في سورة الفاتحة إِيَّاكَ نَعْبُدُ تعني (…) وَإِيَّاكَ نَسْتَعِين تعني (…)",
        answers: [
          "إيّاك نعبد: أن العبادات كالصلاة والدعاء والصدقة وغيرها تكون لله وحده، إيّاك نستعين: أننا لا نتوكل ولا نستعين إلا بالله تعالى في جميع أمورنا",
          "إيّاك نعبد: أننا لا نتوكل ولا نستعين إلا بالله تعالى في جميع أمورنا، إيّاك نستعين: أن العبادات كالصلاة والدعاء والصدقة وغيرها تكون لله وحده"
        ],
        correct: 0
      },
      {
        question: "كيف أتصرف عندما يتنمر بعض الأشخاص على طفل ما؟",
        answers: [
          "أقوم بمشاركتهم لأظهر قوتي وأكون صديقهم",
          "أقف مع الحق وأُبين لهم الخطأ الذي وقعوا فيه"
        ],
        correct: 1
      },
      {
        question: "ماذا يحدث لجسمنا عندما نسهر لساعات متأخرة من الليل؟",
        answers: [
          "نشعر بالتعب وقلة التركيز في اليوم التالي",
          "تنتج أجسامنا هرمون النمو بكثرة",
          "نزداد تميزًا وذكاءً",
          "نصبح أكثر حيوية ونشاطًا",
          "نواجه صعوبة في الاستيقاظ مبكرًا"
        ],
        correct: 0
      },
      // Level 1 - Bonus
      {
        question: "هل أعجبتك مبادرة أينع؟",
        answers: ["نعم", "لا"],
        correct: 0
      },

      // Level 2 - Mandatory
      {
        question: "اختر الحديث الذي ذُكر في مقرر 'أخلاق المسلم'، في موقف السخرية من الطفل الصغير:",
        answers: [
          "تبسمك في وجه أخيك صدقة",
          "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
          "من كان يؤمن بالله واليوم الآخر فليقل خيرا أو ليصمت",
          "والله في عون العبد ما كان العبد في عون أخيه"
        ],
        correct: 2
      },
      {
        question: "في برنامج سكراتش، ما وظيفة الشكل السداسي الموجود داخل كتلة 'If ... then'؟",
        answers: [
          "يجعل الشخصية تقفز",
          "يخزن الألوان",
          "يطرح سؤالًا",
          "يفحص إذا كان الشرط صحيحًا أو خطأ"
        ],
        correct: 3
      },
      {
        question: "سميت قبة الصخرة بهذا الاسم لأنها:",
        answers: [
          "مصنوعة من الحجارة الصلبة",
          "تقع بين صخرتين كبيرتين",
          "بُنيت فوق الصخرة المشرّفة التي عرج منها النبي ﷺ إلى السماء"
        ],
        correct: 2
      },
      // Level 2 - Bonus
      {
        question: "من هو النبي الذي بنى السفينة لينجوا من الطوفان؟",
        answers: [
          "نوح عليه السلام",
          "يونس عليه السلام"
        ],
        correct: 0
      },

      // Level 3 - Mandatory
      {
        question: "ماذا كان شرط النبي ﷺ ليُطلق سراح الأسرى في غزوة بدر؟",
        answers: [
          "مئة قطعة ذهبية",
          "تعليم عشرة مسلمين القراءة والكتابة",
          "مساعدة المسلمين ضد عدوهم"
        ],
        correct: 1
      },
      {
        question: "نعزز هويتنا الإسلامية ب:",
        answers: [
          "الاقتداء بالمشاهير",
          "الاقتداء بأي شخص مسلم نعرفه",
          "الاقتداء بالرسول ﷺ والصحابة"
        ],
        correct: 2
      },
      {
        question: "الولد الصالح لا:",
        answers: [
          "يبر والديه",
          "يأمر بالمعروف",
          "يقيم الصلاة",
          "يسرق"
        ],
        correct: 3
      },
      // Level 3 - Bonus
      {
        question: "ما إسم صغير الدب؟",
        answers: ["شبل", "ديسم"],
        correct: 1
      },

      // Level 4 - Mandatory
      {
        question: "من قرأ القرآن وهو يتتعتع فيه:",
        answers: [
          "مذنب وسيعاقب عليه",
          "أجره مثل أجر أي شخص آخر",
          "له أجران أجر التلاوة وأجر المشقة"
        ],
        correct: 2
      },
      {
        question: "أكمل الحديث، خيركم خيركم:",
        answers: [
          "لأصدقاءه",
          "لمعلمه",
          "لأهله"
        ],
        correct: 2
      },
      {
        question: "من أفضل الصدقات:",
        answers: [
          "التصدق بالمال",
          "سقيا الماء",
          "التصدق بالألعاب"
        ],
        correct: 1
      },
      // Level 4 - Bonus
      {
        question: "هل أنجزت تحدي سقيا الماء؟",
        answers: ["نعم", "لا"],
        correct: 0
      },

      // Level 5 - Mandatory
      {
        question: "الفائز الحقيقي هو من:",
        answers: [
          "جمع الكثير من المال",
          "المتفوق في دراسته",
          "من زحزح عن النار ودخل الجنة"
        ],
        correct: 2
      },
      {
        question: "ما أول شيء نحتاجه لتدريب روبوت ليصبح ذكيًا؟",
        answers: [
          "التعليمات والأوامر",
          "البيانات",
          "توصيله بالكهرباء"
        ],
        correct: 1
      },
      {
        question: "ماذا فعل عمر بن الخطاب رضي الله عنه بعد وفاة زوج حفصة الأول؟",
        answers: [
          "أمر حفصة أن تتفرغ للعبادة فقط",
          "ذهب إلى النبي ﷺ يطلب منه أن يتزوجها",
          "عرض الزواج منها على بعض الصحابة الصالحين"
        ],
        correct: 2
      },
      // Level 5 - Bonus
      {
        question: "هل ستداوم على الصدقات بإذن الله؟",
        answers: ["نعم", "لا"],
        correct: 0
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
        const map = levelMaps[currentLevel];
        const mapWidth = map[0].length;
        const mapHeight = map.length;
        
        // Calculate tile size to maximize screen usage
        this.tileSize = Math.min(
          Math.floor(dimensions.width / mapWidth),
          Math.floor(dimensions.height / mapHeight)
        );
        
        this.questionsAnswered = 0;
        this.bonusTriggered = false;
        this.walls = this.physics.add.staticGroup();
        
        // Center the maze
        const offsetX = (dimensions.width - (mapWidth * this.tileSize)) / 2;
        const offsetY = (dimensions.height - (mapHeight * this.tileSize)) / 2;

        // Build the maze
        map.forEach((row, y) => {
          row.split('').forEach((cell, x) => {
            const worldX = offsetX + x * this.tileSize;
            const worldY = offsetY + y * this.tileSize;

            if (cell === '1') {
              const wall = this.add.rectangle(worldX, worldY, this.tileSize - 2, this.tileSize - 2, 0x29484e)
                .setOrigin(0);
              this.physics.add.existing(wall, true);
              this.walls.add(wall);
            }
            if (cell === '2') {
              this.door = this.add.rectangle(
                worldX + this.tileSize/2, 
                worldY + this.tileSize/2, 
                this.tileSize - 2, 
                this.tileSize - 2, 
                0x0000ff
              ).setOrigin(0.5);
              this.physics.add.existing(this.door, true);
            }
            if (cell === '3') {
              this.star = this.add.circle(
                worldX + this.tileSize/2, 
                worldY + this.tileSize/2, 
                this.tileSize/3, 
                0x37f265
              );
              this.physics.add.existing(this.star, true);
            }
          });
        });

        // Player setup - scale proportionally
        this.player = this.physics.add.sprite(
          offsetX + this.tileSize * 1.25, 
          offsetY + this.tileSize * 1.25, 
          'player'
        ).setScale(this.tileSize / 50);

        this.physics.add.collider(this.player, this.walls);

        if (this.door) {
          this.physics.add.overlap(this.player, this.door, () => this.checkQuizProgress(), null, this);
        }

        if (this.star) {
          this.physics.add.overlap(this.player, this.star, () => this.triggerBonus(), null, this);
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        // Level indicator
        this.add.text(dimensions.width - 20, 20, `المستوى ${currentLevel + 1}`, {
          fontSize: `${Math.min(this.tileSize * 0.75, 24)}px`,
          fill: '#29484e',
          fontFamily: 'Arial',
          rtl: true
        }).setOrigin(1, 0).setScrollFactor(0);
      }

      update() {
        const speed = this.tileSize * 4.7;
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
          showPopup('!الباب مفتوح', () => {
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
      btn.textContent = 'متابعة';
      btn.onclick = () => {
        box.style.display = 'none';
        if (onClose) onClose();
      };
      btn.style.padding = '10px';
      btn.style.backgroundColor = '#29484e';
      btn.style.color = '#fff';
      btn.style.fontSize = 'min(4vw, 18px)';
      btn.style.width = '100%';
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
        btn.style.direction = 'rtl';
        btn.style.fontSize = 'min(4vw, 18px)';
        opts.appendChild(btn);
      });
      box.style.display = 'block';
    }

    game = new Phaser.Game({
      type: Phaser.AUTO,
      width: dimensions.width,
      height: dimensions.height,
      parent: 'game-container',
      backgroundColor: '#e0ddcc',
      physics: { default: 'arcade', arcade: { debug: false } },
      scene: MazeScene
    });

    return () => game.destroy(true);
  }, [dimensions]);

  return (
    <div style={{ 
      direction: 'rtl',
      fontFamily: 'Arial',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <div id="game-container" style={{ 
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0
      }}></div>
      
      <div id="quizBox" style={{
        display: 'none',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#e0ddcc',
        border: '5px solid #37f265',
        padding: '2vw',
        borderRadius: '10px',
        zIndex: 999,
        fontFamily: 'Arial',
        width: '80vw',
        maxWidth: '600px',
        textAlign: 'right',
        color: '#29484e',
        direction: 'rtl',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div id="questionText" style={{ 
          marginBottom: '15px', 
          fontWeight: 'bold', 
          color: '#29484e',
          fontSize: 'min(5vw, 24px)'
        }}></div>
        <div id="options" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}></div>
      </div>

      {finalScore !== null && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          border: '5px solid #37f265',
          padding: '5vw',
          borderRadius: '15px',
          fontFamily: 'Arial',
          textAlign: 'center',
          zIndex: 1000,
          color: '#29484e',
          width: '80vw',
          maxWidth: '500px',
          direction: 'rtl'
        }}>
          <h2 style={{ fontSize: 'min(6vw, 28px)' }}>!🎉 لقد أكملت المتاهة</h2>
          <p style={{ fontSize: 'min(4vw, 20px)' }}>النقاط النهائية:</p>
          <h1 style={{ fontSize: 'min(10vw, 48px)' }}>{finalScore}</h1>
        </div>
      )}
    </div>
  );
}

export default MazeGame;