/**
 * SIDELINE Sports Desk — Comprehensive Sport Rules & Tournament Specific Regulations Database
 * Covers all 20 sports with official governing body rules, court/field specs, scoring, violations,
 * plus tournament-specific rules and tournament metadata.
 */

export const SIDELINE_SPORTS_RULES = {
  Cricket: {
    governingBody: "International Cricket Council (ICC)",
    objective: "Score more runs than the opposing team while taking 10 wickets or restricting the opponent within allotted overs.",
    playingArea: "Oval grass field with a central 22-yard (20.12 m) pitch and 3 stumps with bails at each end.",
    players: "11 players per side on the field (1 bowler, 1 wicket-keeper, 9 fielders; 2 batsmen on pitch).",
    duration: "Varies by format: Test (5 days / min 90 overs/day), One Day International (50 overs/side), T20 (20 overs/side).",
    scoring: "Runs scored by batsmen running between wickets (1, 2, 3), hitting boundaries along the ground (4 runs), or over the boundary on the full (6 runs). Extras include No-balls, Wides, Byes, and Leg-byes.",
    dismissals: "10 modes of dismissal: Bowled, Caught, Leg Before Wicket (LBW), Run Out, Stumped, Hit Wicket, Handled the Ball (Obstructing the Field), Timed Out, Hit the Ball Twice.",
    keyRules: [
      "Each over consists of 6 legal deliveries bowled from alternate ends of the pitch.",
      "A bowler cannot bowl two consecutive overs.",
      "No-ball incurs a 1-run penalty plus an extra ball, and in limited-overs formats awards a Free Hit to the batsman.",
      "Wide ball awards 1 run and must be re-bowled.",
      "Decision Review System (DRS) allows teams 2 reviews per innings in limited-overs and 3 per innings in Tests."
    ]
  },

  Football: {
    governingBody: "FIFA (Fédération Internationale de Football Association) & IFAB",
    objective: "Propel the ball into the opponent's goal using any part of the body except hands and arms (goalkeepers exempted within their penalty area).",
    playingArea: "Rectangular grass or artificial turf pitch (100–110 m long by 64–75 m wide) with goals (7.32 m wide, 2.44 m high).",
    players: "11 players per team (1 goalkeeper and 10 outfield players). Minimum 7 players required.",
    duration: "90 minutes split into two 45-minute halves, plus additional stoppage/injury time added by the referee.",
    scoring: "1 point per goal scored when the whole ball completely crosses the goal line between the posts and under the crossbar.",
    offsideRule: "A player is offside if closer to the opponent's goal line than both the ball and the second-last opponent at the instant the ball is played to them, unless in their own half or receiving from a throw-in, corner, or goal kick.",
    keyRules: [
      "Handball: Deliberate touch with hand/arm, or position making the body unnaturally bigger, is penalised.",
      "Fouls & Misconduct: Direct/indirect free kicks awarded. Yellow card for caution, red card for send-off (team plays down a player). Two yellow cards equal an automatic red.",
      "Penalty Kick: Awarded for direct free kick offences committed inside the defending team's penalty area; taken from the 12-yard penalty spot.",
      "Substitutions: Up to 5 substitutions permitted across 3 stoppage windows during normal time."
    ]
  },

  Basketball: {
    governingBody: "FIBA (International Basketball Federation) & NBA",
    objective: "Score points by shooting the ball through an elevated 10-foot (3.05 m) hoop while defending one's own basket.",
    playingArea: "Hardwood court 28 m × 15 m (FIBA) or 94 ft × 50 ft (NBA) with a 3-point arc (6.75 m FIBA / 7.24 m NBA) and free throw line.",
    players: "5 players per team on court with unlimited rolling substitutions.",
    duration: "FIBA: 4 quarters of 10 minutes (40 mins total). NBA: 4 quarters of 12 minutes (48 mins total). 5-minute overtime periods if tied.",
    scoring: "Field goals inside 3-point line award 2 points. Field goals beyond the arc award 3 points. Free throws award 1 point each.",
    shotClock: "24-second shot clock to attempt a shot that contacts the rim; resets to 14 seconds on offensive rebound.",
    keyRules: [
      "Dribbling: Players must bounce the ball while moving. Double dribble (dribbling with two hands or stopping and restarting) and traveling (taking more than two steps without dribbling) turn over possession.",
      "Personal Fouls: Illegal physical contact. A player fouls out on 5 personal fouls (FIBA) or 6 personal fouls (NBA).",
      "Bonus/Penalty: Exceeding team foul limit (4 fouls in a quarter) awards opponent 2 free throws on subsequent non-shooting fouls.",
      "Time Violations: 8-second rule to advance past half court; 3-second offensive key violation; 5-second closely guarded or inbound violation."
    ]
  },

  Tennis: {
    governingBody: "International Tennis Federation (ITF), ATP & WTA",
    objective: "Hit the ball over the net into the opponent's court such that they cannot make a legal return before the second bounce.",
    playingArea: "Rectangular court 78 ft (23.77 m) long; 27 ft (8.23 m) wide for singles, 36 ft (10.97 m) wide for doubles. Surfaces: Grass, Clay, Hard court.",
    players: "Singles (1 vs 1) or Doubles (2 vs 2).",
    duration: "Best of 3 sets (most tour events) or best of 5 sets (Men's Grand Slam singles).",
    scoring: "Points progress: 15, 30, 40, Game. Tied at 40-40 is 'Deuce', requiring a 2-point margin ('Advantage'). First to 6 games with a 2-game margin wins a set. At 6-6, a 7-point tiebreak decides the set.",
    keyRules: [
      "Service: Server delivers diagonal ball from behind baseline into opposite service box. 2 serves allowed per point. Foot faults penalised.",
      "Let: Service let replayed if the serve clips the net cord and lands legally inside the box.",
      "Ball in play: Ball landing on boundary lines is good. Players cannot touch the net with body or racket.",
      "Grand Slam 10-Point Tiebreak: All Grand Slams play a 10-point super tiebreak (win by 2) at 6-6 in the final deciding set."
    ]
  },

  Badminton: {
    governingBody: "Badminton World Federation (BWF)",
    objective: "Hit the feathered shuttlecock over the 1.55 m high net into the opponent's court so it hits the floor before it can be returned.",
    playingArea: "Indoor court 13.4 m long × 5.18 m wide (singles) or 6.10 m wide (doubles).",
    players: "Singles (1 vs 1) or Doubles (2 vs 2: Men's, Women's, Mixed).",
    duration: "Best of 3 games to 21 points (rally scoring).",
    scoring: "Every rally won earns 1 point. At 20-20, a 2-point lead is required up to a sudden-death cap at 29-29, where 30th point wins.",
    keyRules: [
      "Service: Shuttle must be struck below waist height (1.15 m fixed height gauge) with racket head pointing downward.",
      "Faults: Shuttle landing out of bounds, passing through/under net, touching player or clothing, or struck twice by same side.",
      "Net touches: Racket or player body touching the net while shuttle is in play is an immediate fault.",
      "Intervals: 60-second interval when leading score reaches 11 points; 120-second interval between games."
    ]
  },

  Hockey: {
    governingBody: "International Hockey Federation (FIH)",
    objective: "Use the flat face of a hooked hockey stick to pass, dribble and shoot a hard plastic ball into the opponent's goal.",
    playingArea: "Synthetic water-based turf pitch (91.4 m × 55 m) with striking circles ('D' arc, 14.63 m radius).",
    players: "11 players per side (1 goalkeeper, 10 outfielders) with unlimited rolling substitutions.",
    duration: "60 minutes split into 4 quarters of 15 minutes each. Tied knockout matches decided by 8-second 1v1 shoot-outs.",
    scoring: "1 point per goal. A goal can ONLY be scored if the ball is struck or touched by an attacker's stick inside the opponent's striking circle ('D').",
    keyRules: [
      "Flat side only: Only the flat side and edges of the stick may be used; rounded back is illegal.",
      "No feet/body: Field players cannot intentionally touch the ball with feet or body.",
      "Penalty Corner: Awarded for defensive fouls inside the circle or intentional fouls inside the 23 m area; defenders defend goal from behind backline.",
      "Penalty Stroke: Awarded for intentional foul preventing a probable goal inside the circle; taken from 6.4 m spot 1v1 against goalkeeper.",
      "Cards: Green card (2-minute temporary suspension), Yellow card (5 or 10-minute suspension), Red card (permanent expulsion)."
    ]
  },

  Rugby: {
    governingBody: "World Rugby",
    objective: "Carry, pass, kick and ground the oval ball behind the opponent's goal line (in-goal area) while tackling opposing ball-carriers.",
    playingArea: "Grass pitch up to 100 m long × 70 m wide with H-shaped goal posts on try lines.",
    players: "Rugby Union: 15 players (8 forwards, 7 backs). Rugby Sevens: 7 players per side.",
    duration: "Union: 80 minutes (two 40-minute halves). Sevens: 14 minutes (two 7-minute halves; 20 minutes in finals).",
    scoring: "Try (grounding ball in in-goal) = 5 points; Conversion kick = 2 points; Penalty kick = 3 points; Drop goal = 3 points.",
    keyRules: [
      "Forward passes: Passing the ball forward with hands is strictly prohibited; all hand passes must be backwards or flat.",
      "Offside: Players must stay behind the ball in open play and behind the hindmost foot in rucks and mauls.",
      "Tackles: Tackling must be below the sternum/waist; high tackles above shoulder line result in yellow or red cards.",
      "Scrum & Lineout: Scrums restart play after forward knock-ons; lineouts restart play when ball crosses the touchline."
    ]
  },

  Volleyball: {
    governingBody: "FIVB (Fédération Internationale de Volleyball)",
    objective: "Send the ball over the net and ground it on the opponent's court, preventing the opponent from doing the same.",
    playingArea: "Indoor court 18 m × 9 m divided by net (2.43 m high for men, 2.24 m for women) with a 3 m attack line.",
    players: "6 players per team on court. Rotations clockwise upon winning service from opponent.",
    duration: "Best of 5 sets. First 4 sets played to 25 points (win by 2); 5th deciding set played to 15 points (win by 2).",
    scoring: "Rally point system: every ball in play results in a point.",
    keyRules: [
      "Three hits maximum: Each team is allowed a maximum of 3 touches before sending ball over net (blocks do not count as a touch).",
      "No double contact or carry: A player cannot touch the ball twice consecutively, nor hold/catch/throw the ball.",
      "Libero: Specialized defensive player in contrasting jersey who cannot attack above net height, serve, or block.",
      "Net violations: Touching the net tape or illegally interfering with opponent under the net is a fault."
    ]
  },

  "Formula 1": {
    governingBody: "FIA (Fédération Internationale de l'Automobile)",
    objective: "Complete a grand prix distance (~305 km) in the shortest possible time in an open-wheel hybrid racing car.",
    playingArea: "FIA Grade 1 circuits (purpose-built tracks or temporary street circuits) between 3.5 km and 7 km per lap.",
    players: "20 drivers across 10 constructor teams (2 cars per team).",
    duration: "Max 2 hours of racing time (max 3 hours including red-flag stoppages). Typical race: 50–70 laps.",
    scoring: "Points to top 10 finishers: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1. Plus 1 bonus point for fastest lap (if finishing top 10).",
    keyRules: [
      "Mandatory pit stop: In dry conditions, drivers must use at least two different dry tire compounds (Soft, Medium, Hard).",
      "DRS (Drag Reduction System): Rear wing flap opens in designated zones if within 1.0 second of car ahead to aid overtaking.",
      "Track limits: All 4 wheels crossing the white track perimeter line results in lap deletion and eventual 5-second penalties.",
      "Safety Car & VSC: Deployed during crashes to neutralize race pace; passing strictly prohibited under yellow flag conditions."
    ]
  },

  Athletics: {
    governingBody: "World Athletics",
    objective: "Run faster, jump higher/longer, or throw further across track, field, road, and combined events.",
    playingArea: "Standard 400 m oval synthetic track (8 or 9 lanes of 1.22 m width) with infield for field jumps and throws.",
    categories: "Track (Sprints 100/200/400m, Middle 800/1500m, Long 5000/10000m, Hurdles, Relays), Jumps (High, Long, Triple, Pole Vault), Throws (Shot Put, Discus, Javelin, Hammer).",
    duration: "Instant timed finals or field attempts across rounds (typically 3 preliminary attempts + 3 final attempts for top 8).",
    scoring: "Track: Fastest electronically recorded time (to 1/100th second). Field: Furthest measured distance or highest cleared bar.",
    keyRules: [
      "False start rule: Any runner initiating movement before 0.100s after the gun is disqualified immediately (zero tolerance).",
      "Lane discipline: Stepping on the inside lane line on bends in 200m/400m results in lane infringement disqualification.",
      "Wind assistance: Tailwinds exceeding +2.0 m/s invalidate world records in 100m, 200m, short hurdles, long jump, and triple jump."
    ]
  },

  Baseball: {
    governingBody: "WBSC (World Baseball Softball Confederation) & MLB",
    objective: "Batters hit pitched balls and run around 4 bases to score runs while the fielding team attempts to record 3 outs per inning.",
    playingArea: "Diamond-shaped infield with bases 90 ft (27.4 m) apart and outfield enclosed by outfield fence (300–415 ft from home plate).",
    players: "9 players per team (Pitcher, Catcher, 4 Infielders, 3 Outfielders, plus optional Designated Hitter).",
    duration: "9 innings (each divided into top half for visitors batting and bottom half for home team batting).",
    scoring: "1 run awarded each time a runner touches 1st, 2nd, 3rd base and home plate safely before 3 outs are recorded in the inning.",
    keyRules: [
      "Strike zone: Area over home plate between batter's armpits and top of knees. 3 strikes make an out; 4 balls award a walk to 1st base.",
      "Outs: Strikeout, Flyout (caught in air), Groundout (thrown to 1st before runner arrives), Tag out, Force out.",
      "Pitch Clock: Pitchers have 15–20 seconds between pitches to deliver ball; batter must be ready with 8 seconds remaining.",
      "Extra innings: If tied after 9 innings, game continues with free runner placed on second base to begin each extra half-inning."
    ]
  },

  Golf: {
    governingBody: "The R&A and USGA (United States Golf Association)",
    objective: "Hit a ball from the tee into a hole in the fewest strokes using various clubs (max 14 clubs in bag).",
    playingArea: "18-hole outdoor course comprising teeing grounds, fairways, rough, hazards (sand bunkers, water), and putting greens with 4.25-inch cups.",
    players: "Individual stroke play or match play; team competitions (pairs and singles).",
    duration: "Standard stroke play tournament is 72 holes played over 4 rounds (18 holes per day).",
    scoring: "Strokes counted per hole against Par (3, 4, or 5 strokes). Under Par is Birdie (-1), Eagle (-2), Albatross (-3). Over Par is Bogey (+1), Double Bogey (+2). Lowest cumulative 72-hole score wins.",
    keyRules: [
      "Play the ball as it lies: Moving ball without rule authorization incurs penalty strokes.",
      "Out of Bounds / Lost Ball: Stroke and distance penalty (1 penalty stroke, play another ball from previous spot).",
      "Penalty Areas (Water): 1 penalty stroke to drop within two club-lengths or back on the line of sight.",
      "36-Hole Cut: After 2 rounds (36 holes), only top 50–70 players plus ties advance to the weekend rounds."
    ]
  },

  Boxing: {
    governingBody: "World Boxing Association, WBC, IBF, WBO (Pro) & World Boxing / IBA (Olympic)",
    objective: "Out-strike or knock out the opponent using padded fists while defending oneself within the Marquess of Queensberry rules.",
    playingArea: "Square ring ('squared circle') 16 to 24 feet per side, enclosed by 4 ropes and padded corners.",
    players: "1 vs 1 in matched weight classes (Heavyweight down to Strawweight / Flyweight).",
    duration: "Olympic: 3 rounds of 3 minutes each. Professional Championship: Up to 12 rounds of 3 minutes (2 minutes for women).",
    scoring: "10-Point Must System: Round winner receives 10 points; opponent receives 9 (or 8/7 if knocked down or heavily dominated). 3 judges score ringside.",
    keyRules: [
      "Legal punches: Must land with knuckle part of closed glove to front or side of head or torso above waistline.",
      "Fouls: Low blows (below belt), hitting behind head (rabbit punch), kidney punches, headbutts, holding, and hitting when opponent is down.",
      "Stoppages: Knockout (KO - count of 10), Technical Knockout (TKO - referee stops fight or corner throws towel), Disqualification (DQ)."
    ]
  },

  Wrestling: {
    governingBody: "United World Wrestling (UWW)",
    objective: "Take down, control, turn, and pin the opponent's shoulder blades to the mat for a fall, or outscore on points.",
    playingArea: "Circular mat 12 m × 12 m with a central 9-metre competition zone and 1-metre orange passivity boundary zone.",
    styles: "Freestyle (legs can be used for attacks and defense) and Greco-Roman (strictly upper body attacks; holds below waist prohibited).",
    players: "1 vs 1 combat; competitors matched within strict weight classes.",
    duration: "Two 3-minute periods with a 30-second interval.",
    scoring: "Takedowns award 2, 4, or 5 points (high amplitude throws). Turns / exposures award 2 points. Reversals award 1 point. Push-outs award 1 point.",
    keyRules: [
      "Fall / Pin: Both opponent shoulders pressed flat to the mat simultaneously (ends match instantly).",
      "Technical Superiority: 10-point lead in Freestyle or 8-point lead in Greco-Roman ends match immediately.",
      "Points: Highest points at end of regulation. In a tie, highest-value action, fewest cautions, or last-point scored wins."
    ]
  },

  Swimming: {
    governingBody: "World Aquatics",
    objective: "Propel through the water across designated distances and strokes in the fastest recorded electronic touch-pad time.",
    playingArea: "Olympic 50-metre long-course pool (8 or 10 lanes, each 2.5 m wide, 2–3 m deep) with backstroke flags and lane ropes.",
    strokes: "Freestyle (front crawl), Backstroke, Breaststroke, Butterfly, and Individual Medley (IM - butterfly, backstroke, breaststroke, freestyle).",
    distances: "50m, 100m, 200m, 400m, 800m, 1500m individual races plus 4x100m and 4x200m relays.",
    players: "Individual competitors per lane; 4 swimmers per team in relay events.",
    duration: "Timed finals; prelims, semifinals, and 8-swimmer finals in championship meets.",
    scoring: "Fastest swimmer to touch the electronic wall touchpad wins. Times measured to 1/100th of a second (0.01 s).",
    keyRules: [
      "False Start: Any swimmer leaving starting block before the starting signal is immediately disqualified.",
      "Turn & Touch: Swimmers must touch wall at each turn and finish; 15-metre underwater kicking limit on start and turns.",
      "Stroke rules: Breaststroke requires simultaneous symmetrical arm sweeps and frog kicks; Butterfly requires simultaneous two-hand touch and dolphin kick."
    ]
  },

  Cycling: {
    governingBody: "Union Cycliste Internationale (UCI)",
    playingArea: "Paved public road circuits, cobblestone sectors, mountain passes, or indoor velodromes.",
    players: "Individual riders within professional teams of 7–8 riders working as domestiques and leaders.",
    objective: "Ride a pedal-powered bicycle over specified road distances, mountain trails, or velodrome tracks in the lowest time or highest placing.",
    disciplines: "Road Racing (Stage races, One-day Classics, Time Trials), Track Cycling (Sprint, Keirin, Team Pursuit, Omnium), Mountain Bike (Cross-Country, Downhill), BMX.",
    duration: "One-day classics: 200–300 km (6–7 hours). Grand Tours: 21 stages across 23 days (~3,500 km).",
    scoring: "Road: Clock time elapsed. The rider with lowest cumulative time wins General Classification. Sprints and mountain summits award points.",
    keyRules: [
      "Drafting: Legal and vital in road racing; riders save 30–40% energy inside the peloton (strictly banned in individual time trials).",
      "Feed Zones & Bidons: Strict regulations on where food and water musettes can be passed to riders from team cars.",
      "3-Kilometre Rule: Crashes or mechanicals occurring in the final 3 km of flat road stages award affected riders the time of the peloton group they were in."
    ]
  },

  "Table Tennis": {
    governingBody: "International Table Tennis Federation (ITTF)",
    objective: "Hit the lightweight celluloid/plastic 40mm ball over the net onto the opponent's table half so they cannot return it.",
    playingArea: "Table 2.74 m long × 1.525 m wide, 76 cm high with a 15.25 cm high net. Rubber-faced wooden paddle.",
    players: "Singles (1 vs 1) or Doubles (2 vs 2: Men's, Women's, Mixed).",
    duration: "Best of 7 games (Major Championships) or best of 5 games.",
    scoring: "First to 11 points (must win by 2 points). At 10-10 deuce, service alternates after every point.",
    keyRules: [
      "Service: Ball must rest freely on open palm, tossed near-vertically at least 16 cm high without spin, and struck behind baseline on descent.",
      "Alternating Service: Service alternates every 2 points.",
      "Doubles rule: Players must alternate hitting the ball on every return; service must always be diagonal from right half to right half."
    ]
  },

  "Kho-kho": {
    governingBody: "Kho Kho Federation of India (KKFI) & International Kho Kho Federation",
    objective: "Chasing team sits in central lane facing alternate directions; chaser must tag out dodging defenders inside the court before time runs out.",
    playingArea: "Rectangular court 27 m × 16 m with 8 central squares and wooden poles at each end.",
    players: "12 players per team (9 on court, 3 substitutes). Chasers enter in batch of 9; defenders enter in batches of 3.",
    duration: "2 innings of two 9-minute turns each (chasing turn and defending turn).",
    scoring: "Chasing team scores 1 point (or 2/3 points under Ultimate Kho Kho league rules) for every defender dismissed.",
    keyRules: [
      "Giving Kho: Active chaser must tap a seated teammate on the back and shout 'KHO' to pass the chase.",
      "Direction rule: A chaser cannot turn back once they have chosen a direction of run until reaching a pole.",
      "Crossing central line: Chaser cannot step over the central line without going around the turning pole.",
      "Defenders: Must evade chasers inside court boundaries; stepping out of bounds is an automatic out."
    ]
  },

  Kabaddi: {
    governingBody: "International Kabaddi Federation (IKF) & AKFI",
    objective: "A raider crosses into opponent's half, tags one or more defenders while chanting 'Kabaddi' on a single breath, and returns safely to own half.",
    playingArea: "Mat court 13 m × 10 m (Men) or 12 m × 8 m (Women) with mid-line, baulk lines, and bonus lines.",
    players: "7 active players per side on court with 5 substitutes.",
    duration: "40 minutes split into two 20-minute halves (two 15-minute halves for women/juniors).",
    scoring: "1 point for each defender tagged. 1 bonus point for crossing bonus line with one foot in air (when 6 or 7 defenders on court). 1 tackle point for stopping a raider.",
    keyRules: [
      "Cant: Raider must continuously vocalize 'Kabaddi' without breaking breath; breaking chant is an immediate foul.",
      "Raid Clock: Raider has a maximum of 30 seconds to complete the raid and cross the mid-line.",
      "Do-or-Die Raid: If a team produces two consecutive empty raids (no points scored), the 3rd raid is Do-or-Die where raider must score or be out.",
      "Super Tackle: If 3 or fewer defenders tackle the raider successfully, they earn 2 points instead of 1.",
      "All Out: Eliminating all 7 opposing players awards 2 additional bonus points and revives all eliminated players."
    ]
  },

  Chess: {
    governingBody: "FIDE (International Chess Federation)",
    objective: "Checkmate the opponent's king such that the king is under attack and has no legal escape moves.",
    playingArea: "64-square checkered board (8×8 grid alternating light and dark squares) with each player controlling 16 pieces.",
    pieces: "1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, 8 Pawns.",
    duration: "Classical: 90–120 minutes for first 40 moves + increments; Rapid: 15–25 minutes + 10s increment; Blitz: 3–5 minutes + 2s increment.",
    scoring: "Win = 1.0 point, Draw = 0.5 points, Loss = 0.0 points.",
    keyRules: [
      "Touch-move: If a player touches a piece when it is their turn, they must move that piece if legal.",
      "Castling: Special move moving King two squares toward Rook and Rook jumping over King; illegal if King or Rook moved, or passing through check.",
      "En Passant: A pawn moving two squares can be captured diagonally by an enemy pawn as if it had advanced only one square.",
      "Pawn Promotion: Reaching the 8th rank allows a pawn to immediately promote to a Queen, Rook, Bishop, or Knight.",
      "Draw conditions: Stalemate (no legal moves and not in check), Threefold repetition, 50-move rule (no pawn move or capture in 50 moves), Insufficient mating material."
    ]
  }
};

export const SIDELINE_TOURNAMENT_RULES = {
  "World Table Tennis Championships": {
    format: "World championship staged by the ITTF crowning world champions across all 5 disciplines.",
    specialRules: [
      "Historic Perpetual Trophies: Men's Singles (St. Bride Vase), Women's Singles (Geist Prize), Men's Doubles (Iran Cup), Women's Doubles (W.J. Pope Trophy), Mixed Doubles (Heydusek Cup).",
      "Best-of-7 Games: Every match is best-of-7 games to 11 points (must win by a 2-point margin).",
      "5 Core Disciplines: Men's Singles, Women's Singles, Men's Doubles, Women's Doubles, and Mixed Doubles."
    ]
  },

  "Premier League": {
      "format": "20 top English clubs competing across 38 matchdays in a home-and-away round-robin format.",
      "specialRules": [
          "League Standings: 3 points for a win, 1 point for a draw, 0 for a loss. Ranked by Points, then Goal Difference, then Goals Scored.",
          "Relegation & Promotion: The bottom three clubs are automatically relegated to the EFL Championship.",
          "VAR Protocols: Semi-automated offside technology and Premier League VAR hub assess clear and obvious errors in goals, penalties, direct red cards, and mistaken identity."
      ]
  },
  "UEFA European Championship": {
      "format": "24 national teams in a group stage followed by a single-elimination knockout bracket.",
      "specialRules": [
          "Henri Delaunay Trophy: Awarded to the European champion national football team.",
          "Knockout Resolution: 30 minutes of extra time followed by a penalty shootout if tied.",
          "Yellow Card Amnesty: Accumulated single yellow cards are wiped after the quarter-finals to prevent players missing the final."
      ]
  },
  "FA Cup": {
      "format": "World's oldest national football competition (founded 1871), open to eligible clubs throughout the English football pyramid.",
      "specialRules": [
          "Open Draw: Unseeded knockout format where non-league minnows can draw world-class Premier League giants.",
          "No Replays: Replays scrapped in proper rounds; all matches decided on the day with extra time and penalties if needed.",
          "Wembley Final: Both semifinals and the final are traditionally hosted at Wembley Stadium in London."
      ]
  },
  "WNBA": {
      "format": "12-team elite women's professional league playing a 40-game regular season followed by playoffs.",
      "specialRules": [
          "Game Timing: 4 quarters of 10 minutes (FIBA standard duration) with 5-minute overtime periods.",
          "Shot Clock: 24 seconds with a 14-second offensive rebound reset.",
          "Fouls: Players are disqualified upon their 6th personal foul."
      ]
  },
  "FIBA Basketball World Cup": {
      "format": "32 national teams competing quadrennially under official FIBA international basketball regulations.",
      "specialRules": [
          "FIBA Cylinder Rule: Unlike the NBA, players may legally touch or tap the ball once it contacts the rim ring.",
          "No Defensive 3-Seconds: Defenses can legally play a stationary zone inside the painted area.",
          "5 Personal Fouls: Players foul out upon committing their 5th personal foul."
      ]
  },
  "All England Open": {
      "format": "The world's oldest badminton championship (founded 1899), now a premier BWF Super 1000 flagship tournament.",
      "specialRules": [
          "5 Categories Contested: Men's Singles, Women's Singles, Men's Doubles, Women's Doubles, Mixed Doubles.",
          "Super 1000 Regulations: Top-15 singles and top-10 doubles pairs in the world are obligated to attend; no qualifying draw (straight 32-player main draw).",
          "Scoring: Best-of-3 games to 21 points; sudden death at 29-29 with the 30th point winning."
      ]
  },
  "BWF World Championships": {
      "format": "Official World Championship tournament staged in all 5 disciplines to crown individual World Champions.",
      "specialRules": [
          "No Prize Money: BWF World Championships award prestige, BWF world ranking points, and gold medals without monetary prize funds.",
          "Member Associations: Maximum of 4 entries per nation per category (if all 4 are in top 8 world rankings).",
          "5 Core Disciplines: Men's Singles, Women's Singles, Men's Doubles, Women's Doubles, and Mixed Doubles."
      ]
  },
  "Thomas Cup": {
      "format": "The World Men's Team Badminton Championship, contested biennially by the world's elite national men's squads.",
      "specialRules": [
          "Tie Structure: Every tie consists of 5 matches: 3 Singles and 2 Doubles played alternately (Singles 1, Doubles 1, Singles 2, Doubles 2, Singles 3).",
          "World Ranking Order: Singles and doubles pairings must play strictly in descending order of official BWF world ranking.",
          "Thomas Cup Trophy: Pristine 28-inch silver-gilt cup donated by Sir George Thomas in 1939."
      ]
  },
  "Uber Cup": {
      "format": "The World Women's Team Badminton Championship, running concurrently with the Thomas Cup.",
      "specialRules": [
          "Tie Structure: 3 Singles and 2 Doubles matches played in alternating sequence.",
          "Team Roster: Each national squad enters 10 to 12 players covering both singles and doubles specialists.",
          "Trophy: Historic silver trophy featuring a female player on a rotating globe, donated by Betty Uber."
      ]
  },
  "BWF World Tour Finals": {
      "format": "Season-ending championship featuring exclusively the top 8 players/pairs in the BWF World Tour Rankings.",
      "specialRules": [
          "Group Stage + Knockout: Two round-robin groups of 4; top 2 advance to crossover semifinals.",
          "Max 2 Per Country: Maximum of 2 entries per member association in any single discipline.",
          "Current Olympic or World Champion: Automatically receives a wild card invitation if in top 20."
      ]
  },
  "FIH Hockey World Cup": {
      "format": "Quadrennial international men's and women's field hockey world championships.",
      "specialRules": [
          "15-Minute Quarters: 4 quarters of 15 minutes each (60 minutes total regulation time).",
          "Shoot-out Resolution: Tied knockout matches decided by an 8-second 1v1 shootout starting from 23-meter line instead of traditional penalty strokes.",
          "Penalty Corner Specialist: Attacking teams inject ball from backline to battery outside circle for drag flick shots."
      ]
  },
  "FIH Pro League": {
      "format": "Annual global home-and-away international league featuring the world's elite national hockey teams.",
      "specialRules": [
          "Shootout Bonus Point: Matches that end in a draw award 1 point to each team, with the winner of a subsequent 8-second shootout earning an extra bonus point.",
          "Relegation & Promotion: Last place team is relegated to the FIH Nations Cup; Nations Cup winner is promoted."
      ]
  },
  "Olympic Hockey": {
      "format": "12-nation premier Olympic field hockey tournament played on specialized blue synthetic turf pitches.",
      "specialRules": [
          "Green/Yellow/Red Cards: Green (2-minute suspension), Yellow (5 or 10-minute suspension), Red (disqualification and match ban).",
          "Rolling Substitutions: Unlimited rolling substitutions allowed except during penalty corners.",
          "Video Referral: Each team receives one video umpire referral per match, retained if the challenge is successful."
      ]
  },
  "Rugby World Cup": {
      "format": "Quadrennial international rugby union world championship contested by 20 national teams.",
      "specialRules": [
          "Webb Ellis Cup: Awarded to the champion nation, named after William Webb Ellis.",
          "Knockout Extra Time: 20 minutes extra time (10 min each half). If tied, 10 minutes sudden-death extra time. If still tied, a 5-kicker place-kicking competition decides the match.",
          "Bonus Points: Pool stage awards 4 points for win, 2 for draw, +1 for scoring 4+ tries, +1 for losing by 7 points or fewer."
      ]
  },
  "Six Nations": {
      "format": "Annual round-robin championship between England, France, Ireland, Italy, Scotland, and Wales.",
      "specialRules": [
          "Grand Slam Bonus: A team winning all 5 matches is awarded 3 bonus points to mathematically guarantee they win the title.",
          "Triple Crown: Awarded if any Home Nation (England, Ireland, Scotland, Wales) defeats the other three Home Nations.",
          "Calcutta Cup: Oldest international trophy contested during the England vs Scotland match."
      ]
  },
  "The Rugby Championship": {
      "format": "Annual southern hemisphere tournament contested by New Zealand, South Africa, Australia, and Argentina.",
      "specialRules": [
          "Bonus Point Criterion: An attacking bonus point is awarded only for scoring 3 or more tries MORE than the opponent.",
          "Bledisloe Cup: Contested within the tournament between New Zealand and Australia.",
          "Freedom Cup & Nelson Mandela Challenge: Historic bilateral trophies contested within match rounds."
      ]
  },
  "Formula 1 World Championship": {
      "format": "24 Grands Prix worldwide featuring 10 constructor teams and 20 drivers competing for Drivers' and Constructors' titles.",
      "specialRules": [
          "Race Distance: All races run to minimum 305 km (except Monaco at 260 km) with a strict 2-hour racing time limit.",
          "Tyre Compounds: Drivers must use at least two different dry-weather slick tyre compounds (Soft, Medium, Hard) during a dry grand prix.",
          "DRS Activation: Drag Reduction System rear-wing flap permitted within 1 second of leading car in designated DRS zones.",
          "Sprint Races: Selected 100 km Saturday sprint races award championship points to the top 8 finishers."
      ]
  },
  "F1 Academy": {
      "format": "All-female driver development series designed to nurture talent for Formula 3, Formula 2, and Formula 1.",
      "specialRules": [
          "Standardized Tatuus F4 Chassis: Powered by turbocharged 1.4L engines producing 174 horsepower to guarantee equal machinery.",
          "F1 Team Backing: 10 of the 15 cars are liveried and supported directly by the 10 Formula 1 teams.",
          "Super Licence Points: Top finishers earn official FIA Super Licence points required to race in Formula 1."
      ]
  },
  "MLB World Series": {
      "format": "Best-of-7 'Fall Classic' between the American League champion and National League champion.",
      "specialRules": [
          "Pitch Timer: Pitchers have 15 seconds with bases empty and 18 seconds with runners on base to deliver the pitch; batters must be in box by 8 seconds.",
          "Shift Ban: 4 infielders must be positioned within the infield dirt boundary, with 2 on either side of second base.",
          "Larger Bases: 18-inch square bases designed to reduce collisions and encourage stolen bases."
      ]
  },
  "World Baseball Classic": {
      "format": "Premier international baseball tournament organized by MLB and the WBSC featuring national teams.",
      "specialRules": [
          "Strict Pitch Count Limits: 65 pitches per game in Round 1, 80 in Round 2, 95 in Championship Round to protect professional arms.",
          "Mercy Run-Ahead Rule: 15-run lead after 5 innings or 10-run lead after 7 innings ends the game immediately.",
          "Extra-Innings Ghost Runner: Each extra inning begins with a runner placed automatically on second base."
      ]
  },
  "PGA Championship": {
      "format": "72-hole major stroke play championship organized by the PGA of America, awarding the historic Wanamaker Trophy.",
      "specialRules": [
          "3-Hole Aggregate Playoff: If tied after 72 holes, players contest a 3-hole aggregate stroke playoff; sudden death if still tied.",
          "PGA Club Professionals: 20 PGA club teaching professionals earn spots via the PGA Professional Championship to compete against world elites."
      ]
  },
  "U.S. Open": {
      "format": "The national golf championship of the United States, renowned for presenting golf's most punishing course setups.",
      "specialRules": [
          "Course Architecture: Narrow fairways, brutal rough, and ultra-slick greens penalize wayward drives.",
          "2-Hole Aggregate Playoff: Ties after 72 holes proceed to a 2-hole cumulative stroke playoff; sudden death if still level."
      ]
  },
  "WBC Championship Fights": {
      "format": "12 rounds of 3 minutes each for male championship bouts (2-minute rounds for female championship bouts).",
      "specialRules": [
          "10-Point Must Scoring: Winner of round receives 10 points; loser receives 9 or fewer (8 for a knockdown).",
          "Open Scoring Option: Judges' scores are announced after rounds 4 and 8 in selected WBC title bouts.",
          "Instant Replay: WBC uses video replay reviews to assess accidental head clashes vs punches causing cuts."
      ]
  },
  "Olympic Boxing": {
      "format": "3 rounds of 3 minutes each in tournament knockout brackets across official weight categories.",
      "specialRules": [
          "5 Ringside Judges: 5 judges score each round; computerized draw selects which scores count.",
          "No Headgear for Men: Elite male amateur boxers compete without head protection under modern Olympic safety protocols."
      ]
  },
  "Giro d'Italia": {
      "format": "3-week 21-stage Grand Tour around Italy, renowned for grueling Alpine and Dolomite mountain climbs.",
      "specialRules": [
          "Maglia Rosa: The pink leader's jersey worn by the general classification time leader, matching the pink pages of La Gazzetta dello Sport.",
          "Cima Coppi: Highest altitude mountain summit of the Giro, offering special climbing classification points.",
          "Trofeo Senza Fine: The iconic spiraling gold trophy awarded to the overall victor in Rome or Milan."
      ]
  },
  "La Vuelta": {
      "format": "3-week 21-stage Grand Tour traversing Spain, featuring steep summit finishes.",
      "specialRules": [
          "Maillot Rojo: The red leader's jersey worn by the overall race leader.",
          "Rampas Inhumanas: Signature ultra-steep gradients exceeding 20% on climbs like the Alto de l'Angliru."
      ]
  },
  "Olympic Table Tennis": {
      "format": "Quadrennial Olympic competition featuring 5 gold medal events: Men's Singles, Women's Singles, Mixed Doubles, Men's Team, Women's Team.",
      "specialRules": [
          "Team Event Structure: Each tie consists of 1 doubles match followed by 4 singles matches (best of 5 matches wins the tie).",
          "Best-of-7 in Singles: All singles matches are best-of-7 games to 11 points (must win by 2).",
          "Country Limit: Maximum 2 players per country in singles to ensure broad international podium diversity."
      ]
  },
  "Ultimate Kho Kho League": {
      "format": "Revolutionary televised franchise league modernizing India's traditional tag game with innovative high-speed rules.",
      "specialRules": [
          "Wazir Player: Attacking team nominates a 'Wazir' who can run in any direction along the pitch without direction restrictions.",
          "Super Attack & Sky Dive: Diving tag maneuvers ('Sky Dives' and 'Pole Dives') score 2 extra bonus points.",
          "Batch Defending: Defenders enter in batches of 3; surviving each 3-minute batch awards dream run bonus points."
      ]
  },
  "Kho Kho World Cup 2025": {
      "format": "Global championship featuring national kho-kho federations under international standard 9-a-side rules.",
      "specialRules": [
          "Alternate Seating: 8 chasers sit in squares facing alternating directions; chasers must touch teammate's back and shout 'Kho' to transfer chase.",
          "Cross Line Rule: Chasers cannot cross the central line dividing the pitch except when running along pole ends."
      ]
  },
  "Pro Kabaddi League": {
      "format": "India's premier 12-team franchise kabaddi league playing a 40-minute high-octane contact format.",
      "specialRules": [
          "Do-or-Die Raid: If a team has two consecutive empty raids, the 3rd raid is 'Do-or-Die'; the raider must score a touch point or is eliminated.",
          "Super Tackle: If defending team has 3 or fewer defenders on court and successfully tackles the raider, they are awarded 2 points instead of 1.",
          "Super Raid: A single raid where the raider scores 3 or more points (via touches and/or bonus line)."
      ]
  },
  "Kabaddi World Cup": {
      "format": "Standard 7-a-side international national team championship.",
      "specialRules": [
          "Cant: Raider must continuously utter 'Kabaddi' without breaking breath throughout the 30-second raid.",
          "Bonus Line: Raider stepping one foot across bonus line with other foot off the ground scores 1 bonus point (active when defense has 6 or 7 players).",
          "All-Out: Eliminating all 7 opposing defenders awards 2 additional bonus points ('Lona')."
      ]
  },
  "FIDE Candidates Tournament": {
      "format": "8-player double round-robin tournament to determine the sole challenger for the World Chess Championship.",
      "specialRules": [
          "14 Classical Rounds: Every candidate plays each opponent once with White and once with Black.",
          "Time Control: 120 minutes for first 40 moves, 30 minutes for rest of game, plus 30-second increment from move 41.",
          "No Draw Offers Before Move 40: Players cannot agree to a draw before Black's 40th move without threefold repetition or stalemate."
      ]
  },
  "Chess Olympiad": {
      "format": "Biennial international chess tournament featuring national teams competing across 11 Swiss-system rounds.",
      "specialRules": [
          "4-Board Match System: Each nation fields 4 boards per round. Match points awarded: 2 for team win, 1 for draw, 0 for loss.",
          "Open & Women's Sections: Separate tournaments run concurrently with Hamilton-Russell Cup and Vera Menchik Cup."
      ]
  },
  // Cricket
  "Indian Premier League": {
    format: "T20 franchise tournament (Group stage followed by Page playoff: Qualifier 1, Eliminator, Qualifier 2, Final).",
    specialRules: [
      "Impact Player Rule: Teams name 5 substitutes at the toss and can substitute one active player at any break in play to bat and bowl.",
      "Two Bouncers per Over: Bowlers are permitted to bowl up to two short-pitched deliveries per over above shoulder height.",
      "DRS for Wides and No-Balls: Teams can challenge on-field umpire calls regarding wides and waist-high full tosses.",
      "Strategic Timeouts: Two mandatory 2.5-minute timeouts per innings (one taken by bowling team, one by batting team).",
      "Smart Replay System: Direct feed between TV umpire and Hawkeye operators eliminates director intermediary for faster LBW, catch and stumping reviews."
    ]
  },
  "The Ashes": {
    format: "5-match Test cricket series between England and Australia, alternating hosts every two years.",
    specialRules: [
      "Historic Urn: The urn is perpetually housed at Lord's; the winner holds the replica trophy, while a drawn series (e.g. 2-2) retains the Ashes for current holder.",
      "Ball Spec: Red Duke cricket ball with pronounced hand-stitched seam used in England; Kookaburra ball used in Australia.",
      "Follow-on Threshold: Team batting first with a lead of 200 runs or more may enforce the follow-on, forcing opponent to bat immediately again.",
      "Light Meter Protocol: Play suspended if natural light falls below safe reading agreed on day 1."
    ]
  },
  "ICC Cricket World Cup": {
    format: "50-over One Day International world championship.",
    specialRules: [
      "Three Powerplays: P1 (overs 1–10, max 2 fielders outside 30-yd ring); P2 (overs 11–40, max 4 fielders); P3 (overs 41–50, max 5 fielders).",
      "Super Over in Ties: Any knockout match ending in a tie proceeds to a 6-ball Super Over. Successive Super Overs played until a winner is determined.",
      "Reserve Days: Scheduled for semifinals and final in the event of persistent rain."
    ]
  },

  // Football
  "FIFA World Cup": {
    format: "Quadrennial international tournament with 32/48 national teams (Group stage followed by single-elimination knockout).",
    specialRules: [
      "Knockout Extra Time: If tied after 90 minutes, two 15-minute extra time periods are played to completion.",
      "Penalty Shootout: Best of 5 penalties per side; sudden death kicks follow if tied after 5 rounds.",
      "6th Substitute: Teams are permitted one additional substitution if a match enters extra time.",
      "Semi-Automated Offside (SAOT): 12 tracking cameras and ball sensor chip provide 3D automated offside visualization."
    ]
  },
  "UEFA Champions League": {
    format: "36-team single league Swiss-system phase followed by two-legged knockouts and single-leg neutral final.",
    specialRules: [
      "No Away Goals Rule: Ties level on aggregate after 180 minutes proceed directly to 30 minutes extra time and penalties.",
      "12 Substitutes on Bench: Managers can select up to 12 substitutes, making up to 5 changes in 3 in-game windows.",
      "Single-leg Final: Played at a pre-selected neutral European stadium; extra time and penalties if tied."
    ]
  },

  // Tennis
  "Wimbledon": {
    format: "The world's oldest tennis championship (founded 1877), played on pristine 100% perennial ryegrass courts.",
    specialRules: [
      "Strict All-White Clothing Rule: Players must wear almost entirely white attire (including underwear, socks, shoe soles and medical supports).",
      "10-Point Final Set Tiebreak: Introduced at 6-6 in the 5th set (Men) or 3rd set (Women) to prevent marathon multi-day matches.",
      "No Advertising Banners: Centre Court and No. 1 Court maintain classic clean green walls free from commercial sponsorship boards.",
      "Curfew: Play must stop promptly at 11:00 PM local time due to London residential noise regulations."
    ]
  },
  "Roland-Garros": {
    format: "French Open, the premier clay court Grand Slam tournament played at Stade Roland Garros in Paris.",
    specialRules: [
      "Red Clay Characteristics: Crushed red brick surface slows ball speed and creates high topspin bounce; players slide into shots.",
      "Ball Marks: Chair umpires step down from chair to inspect ball indentation marks in the clay to resolve disputed line calls.",
      "Retractable Roofs: Court Philippe-Chatrier and Court Suzanne-Lenglen equipped with retractable roofs for night sessions."
    ]
  },
  "Australian Open": {
    format: "First Grand Slam of the calendar year, held at Melbourne Park on blue GreenSet hard courts.",
    specialRules: [
      "Extreme Heat Policy (EHP): Uses the AO Heat Stress Scale (1 to 5). At level 5, outdoor matches suspended and retractable roofs closed on Rod Laver, Margaret Court, and John Cain arenas.",
      "10-Point Final Set Tiebreak: Played at 6-6 in the deciding set.",
      "Electronic Line Calling: 100% automated optical line calling has replaced on-court line judges."
    ]
  },
  "US Open": {
    format: "Fourth and final Grand Slam of the year, played on Laykold hard courts at Flushing Meadows, New York.",
    specialRules: [
      "Historic Night Sessions: Arthur Ashe Stadium hosts electric night matches featuring 24,000 spectators.",
      "Super Tiebreak: First to 10 points (win by 2) at 6-6 in deciding set.",
      "Shot Clock: 25-second countdown strictly enforced between points."
    ]
  },

  // Golf
  "The Masters": {
    format: "72-hole invitation-only Major played annually at Augusta National Golf Club, Georgia.",
    specialRules: [
      "Sudden-Death Playoff: If tied after 72 holes, playoff begins on hole 18, then alternates to hole 10 until a winner emerges.",
      "The Green Jacket: The champion receives the iconic Masters Green Jacket and lifelong invitation to compete.",
      "36-Hole Cut: Top 50 players and ties make the cut for the final two weekend rounds.",
      "Honorary Starters: Golf legends hit ceremonial tee shots off hole 1 on Thursday morning to open tournament."
    ]
  },
  "The Open": {
    format: "The Open Championship ('British Open'), the oldest major championship in golf, played on seaside links courses.",
    specialRules: [
      "4-Hole Aggregate Playoff: Tied players play a 4-hole cumulative stroke playoff; lowest aggregate wins (sudden death if still tied).",
      "Claret Jug: Champion Golfer of the Year receives the silver Golf Champion Trophy (Claret Jug).",
      "Links Conditions: Deep pot bunkers, heavy gorse rough, firm undulating turf, and coastal winds dictate strategic ground play."
    ]
  },
  "Ryder Cup": {
    format: "Biennial match-play competition between 12-man teams representing the United States and Europe.",
    specialRules: [
      "Match Play Scoring: Matches won hole-by-hole rather than total strokes. Match ends when a player/pair leads by more holes than remain (e.g. 3&2).",
      "Format: Friday/Saturday feature 4 Foursomes (alternate shot) and 4 Fourballs (better ball) sessions. Sunday features 12 individual singles.",
      "Points: 28 total points available. 14.5 points needed to win; 14 points retains trophy for reigning holder."
    ]
  },

  // Basketball
  "NBA": {
    format: "82-game regular season followed by Play-In tournament and four best-of-7 playoff rounds.",
    specialRules: [
      "Defensive 3-Seconds: A defender cannot remain in the key for more than 3 seconds unless actively guarding an opponent.",
      "6 Personal Fouls: Players are disqualified on their 6th personal foul.",
      "Goaltending & Basket Interference: Touching the ball on downward flight toward rim or in cylinder above basket is strictly illegal."
    ]
  },
  "EuroLeague": {
    format: "Premier European club competition; double round-robin regular season followed by Play-in, Playoffs, and Final Four.",
    specialRules: [
      "FIBA Cylinder Rule: Once the ball touches the rim, any player can legally tap or swat the ball away.",
      "5 Personal Fouls: Players foul out on their 5th foul.",
      "10-Minute Quarters: Faster 40-minute regulation gameplay."
    ]
  },

  // Formula 1
  "Monaco Grand Prix": {
    format: "78 laps around the legendary 3.337 km Monte Carlo street circuit.",
    specialRules: [
      "Shortest Race Distance: Only grand prix permitted to run under the standard 305 km minimum distance (260.286 km).",
      "Tightest Pit Lane: Reduced pit lane speed limit (60 km/h) due to narrow harbor confines.",
      "Overtaking Premium: Qualifying position has an 85%+ correlation to race victory."
    ]
  },

  // Cycling
  "Tour de France": {
    format: "21-stage three-week Grand Tour covering ~3,500 km across France and neighboring countries.",
    specialRules: [
      "Leaders' Jerseys: Yellow (Overall time leader), Green (Points / Sprinter), Polka Dot (King of the Mountains), White (Best young rider under 26).",
      "Time Elimination Cut: Riders finishing beyond a calculated percentage of stage winner's time are eliminated from the tour.",
      "Feed Zone Musettes: Team staff hand riders food and bottles in designated roadside feeding sectors."
    ]
  }
};

export const SIDELINE_TOURNAMENT_DETAILS = {
  "FA Cup": {
      "founded": 1871,
      "format": "Single-Elimination Knockout",
      "frequency": "Annual (Aug–May)",
      "venue": "England (Wembley Stadium Final)",
      "trophy": "The FA Cup Trophy",
      "recordHolder": "Arsenal (14 titles)",
      "categories": [
          "Men's Club"
      ]
  },
  "WNBA": {
      "founded": 1996,
      "format": "12-Team League & Playoffs",
      "frequency": "Annual (May–Oct)",
      "venue": "United States",
      "trophy": "WNBA Championship Trophy",
      "recordHolder": "Houston Comets, Minnesota Lynx, Seattle Storm (4 titles each)",
      "categories": [
          "Women's Professional"
      ]
  },
  "FIBA Basketball World Cup": {
      "founded": 1950,
      "format": "32-Nation World Championship",
      "frequency": "Quadrennial",
      "venue": "Rotating Host Countries",
      "trophy": "Naismith Trophy",
      "recordHolder": "United States & Yugoslavia (5 titles each)",
      "categories": [
          "Men's National Teams"
      ]
  },
  "Thomas Cup": {
      "founded": 1949,
      "format": "Men's World Team Championship",
      "frequency": "Biennial",
      "venue": "Rotating Global Venues",
      "trophy": "The Thomas Cup",
      "recordHolder": "Indonesia (14 titles)",
      "categories": [
          "Men's Team (3 Singles + 2 Doubles)"
      ]
  },
  "Uber Cup": {
      "founded": 1957,
      "format": "Women's World Team Championship",
      "frequency": "Biennial",
      "venue": "Rotating Global Venues",
      "trophy": "The Uber Cup",
      "recordHolder": "China (16 titles)",
      "categories": [
          "Women's Team (3 Singles + 2 Doubles)"
      ]
  },
  "BWF World Tour Finals": {
      "founded": 2018,
      "format": "Top 8 Group Stage + Knockout",
      "frequency": "Annual (December)",
      "venue": "Rotating Host City (Hangzhou)",
      "trophy": "World Tour Finals Trophy",
      "recordHolder": "Viktor Axelsen (Men's) / Tai Tzu-ying (Women's)",
      "categories": [
          "Men's Singles",
          "Women's Singles",
          "Men's Doubles",
          "Women's Doubles",
          "Mixed Doubles"
      ]
  },
  "FIH Hockey World Cup": {
      "founded": 1971,
      "format": "16-Nation World Tournament",
      "frequency": "Quadrennial",
      "venue": "Rotating Host Stadiums",
      "trophy": "FIH World Cup Trophy",
      "recordHolder": "Pakistan (4 Men's titles) / Netherlands (9 Women's titles)",
      "categories": [
          "Men's National",
          "Women's National"
      ]
  },
  "FIH Pro League": {
      "founded": 2019,
      "format": "Home & Away League",
      "frequency": "Annual (Dec–June)",
      "venue": "Global Hockey Stadiums",
      "trophy": "FIH Pro League Trophy",
      "recordHolder": "Netherlands & Australia (Men's) / Netherlands (Women's)",
      "categories": [
          "Men's International",
          "Women's International"
      ]
  },
  "Olympic Hockey": {
      "founded": 1908,
      "format": "12-Team Olympic Tournament",
      "frequency": "Quadrennial",
      "venue": "Host Olympic Hockey Stadium",
      "trophy": "Olympic Gold Medal",
      "recordHolder": "India (8 Men's Golds) / Netherlands (5 Women's Golds)",
      "categories": [
          "Men's Olympic",
          "Women's Olympic"
      ]
  },
  "Rugby World Cup": {
      "founded": 1987,
      "format": "20-Nation World Tournament",
      "frequency": "Quadrennial",
      "venue": "Rotating Host Nations",
      "trophy": "Webb Ellis Cup",
      "recordHolder": "South Africa (4 titles) / New Zealand (3 titles)",
      "categories": [
          "Men's National Teams"
      ]
  },
  "Investec Champions Cup": {
      "founded": 1995,
      "format": "Top European Club Championship",
      "frequency": "Annual (Oct–May)",
      "venue": "Europe-wide / Neutral Final",
      "trophy": "European Rugby Champions Cup",
      "recordHolder": "Toulouse (6 titles)",
      "categories": [
          "Men's Club"
      ]
  },
  "Formula 1 World Championship": {
      "founded": 1950,
      "format": "24-Race Global Championship",
      "frequency": "Annual (March–Dec)",
      "venue": "Global FIA Grade 1 Circuits",
      "trophy": "FIA Formula One World Championship Trophy",
      "recordHolder": "Michael Schumacher & Lewis Hamilton (7 Drivers' Titles each); Ferrari (16 Constructors')",
      "categories": [
          "Open-Wheel Racing"
      ]
  },
  "Formula 2": {
      "founded": 2017,
      "format": "Feeder Championship to F1",
      "frequency": "Annual (March–Dec)",
      "venue": "Selected F1 Support Weekends",
      "trophy": "FIA Formula 2 Championship Trophy",
      "recordHolder": "George Russell, Charles Leclerc, Oscar Piastri (Championship alumni)",
      "categories": [
          "Single-Seater"
      ]
  },
  "Formula 3": {
      "founded": 2019,
      "format": "FIA Feeder Series to F2",
      "frequency": "Annual",
      "venue": "F1 Support Weekends",
      "trophy": "FIA Formula 3 Trophy",
      "recordHolder": "Prema Racing (Team Champions)",
      "categories": [
          "Single-Seater"
      ]
  },
  "F1 Academy": {
      "founded": 2023,
      "format": "All-Female Driver Championship",
      "frequency": "Annual",
      "venue": "F1 Grand Prix Support Weekends",
      "trophy": "F1 Academy Championship Trophy",
      "recordHolder": "Marta García, Abbi Pulling",
      "categories": [
          "Women's Open-Wheel"
      ]
  },
  "MLB World Series": {
      "founded": 1903,
      "format": "Best-of-7 Championship Series",
      "frequency": "Annual (October)",
      "venue": "AL & NL Ballparks",
      "trophy": "Commissioner's Trophy",
      "recordHolder": "New York Yankees (27 titles)",
      "categories": [
          "Major League Baseball"
      ]
  },
  "World Baseball Classic": {
      "founded": 2006,
      "format": "20-Nation Global Tournament",
      "frequency": "Quadrennial",
      "venue": "Rotating Host Ballparks (USA, Japan)",
      "trophy": "World Baseball Classic Trophy",
      "recordHolder": "Japan (3 titles: 2006, 2009, 2023)",
      "categories": [
          "National Teams"
      ]
  },
  "Little League World Series": {
      "founded": 1947,
      "format": "Youth Tournament (Ages 10-12)",
      "frequency": "Annual (August)",
      "venue": "Williamsport, Pennsylvania, USA",
      "trophy": "Little League World Series Trophy",
      "recordHolder": "Chinese Taipei (17 titles) / California (8)",
      "categories": [
          "Youth Baseball"
      ]
  },
  "PGA Championship": {
      "founded": 1916,
      "format": "72-Hole Stroke Play Major",
      "frequency": "Annual (May)",
      "venue": "Rotating Championship Courses in USA",
      "trophy": "Wanamaker Trophy",
      "recordHolder": "Walter Hagen & Jack Nicklaus (5 titles each)",
      "categories": [
          "Men's Major"
      ]
  },
  "U.S. Open": {
      "founded": 1895,
      "format": "72-Hole Stroke Play Major",
      "frequency": "Annual (June)",
      "venue": "Rotating US Championship Venues",
      "trophy": "U.S. Open Trophy",
      "recordHolder": "Willie Anderson, Bobby Jones, Ben Hogan, Jack Nicklaus (4 titles each)",
      "categories": [
          "Men's Major"
      ]
  },
  "World Boxing Championships": {
      "founded": 1974,
      "format": "Amateur World Knockout",
      "frequency": "Biennial",
      "venue": "Rotating Host Arenas",
      "trophy": "World Championship Gold Medal",
      "recordHolder": "Cuba (Medal table leaders: 81 Gold Medals)",
      "categories": [
          "Men's Weight Divisions",
          "Women's Weight Divisions"
      ]
  },
  "Olympic Boxing": {
      "founded": 1904,
      "format": "Olympic Knockout Tournament",
      "frequency": "Quadrennial",
      "venue": "Host Olympic Arena",
      "trophy": "Olympic Gold Medal & Val Barker Trophy",
      "recordHolder": "United States (50 Gold Medals) / Cuba (41)",
      "categories": [
          "Men's Divisions",
          "Women's Divisions"
      ]
  },
  "WBC Championship Fights": {
      "founded": 1963,
      "format": "12-Round World Title Fights",
      "frequency": "Ongoing Sanctioned Bouts",
      "venue": "Global Boxing Arenas (Las Vegas, Riyadh, London)",
      "trophy": "WBC Green and Gold Championship Belt",
      "recordHolder": "Floyd Mayweather Jr., Julio César Chávez, Muhammad Ali",
      "categories": [
          "17 Professional Weight Classes"
      ]
  },
  "Giro d'Italia": {
      "founded": 1909,
      "format": "21-Stage Grand Tour",
      "frequency": "Annual (May)",
      "venue": "Italy",
      "trophy": "Trofeo Senza Fine (Maglia Rosa)",
      "recordHolder": "Alfredo Binda, Fausto Coppi, Eddy Merckx (5 wins each)",
      "categories": [
          "Men's Elite Grand Tour"
      ]
  },
  "La Vuelta": {
      "founded": 1935,
      "format": "21-Stage Grand Tour",
      "frequency": "Annual (Aug–Sept)",
      "venue": "Spain",
      "trophy": "Maillot Rojo (Red Jersey)",
      "recordHolder": "Roberto Heras & Primož Roglič (4 wins each)",
      "categories": [
          "Men's Elite Grand Tour"
      ]
  },
  "UCI Road World Championships": {
      "founded": 1927,
      "format": "One-Day Road Race & Time Trial",
      "frequency": "Annual (September)",
      "venue": "Rotating Global Cities",
      "trophy": "Rainbow Jersey",
      "recordHolder": "Alfredo Binda, Rik Van Steenbergen, Eddy Merckx, Óscar Freire, Peter Sagan (3 wins each)",
      "categories": [
          "Men's Elite",
          "Women's Elite",
          "Mixed Team Relay"
      ]
  },
  "Ultimate Kho Kho League": {
      "founded": 2022,
      "format": "Franchise 6-Team League",
      "frequency": "Annual",
      "venue": "India (Indoor Stadiums)",
      "trophy": "UKK Champions Trophy",
      "recordHolder": "Odisha Juggernauts, Gujarat Giants",
      "categories": [
          "Men's Professional"
      ]
  },
  "Kho Kho World Cup 2025": {
      "founded": 2025,
      "format": "24-Nation World Tournament",
      "frequency": "Inaugural / Biennial",
      "venue": "New Delhi, India",
      "trophy": "Kho Kho World Cup Trophy",
      "recordHolder": "India (Favorites & Pioneers)",
      "categories": [
          "Men's National",
          "Women's National"
      ]
  },
  "Pro Kabaddi League": {
      "founded": 2014,
      "format": "12-Team Franchise League",
      "frequency": "Annual (Dec–Feb)",
      "venue": "India (12 Caravan Cities)",
      "trophy": "PKL Championship Trophy",
      "recordHolder": "Patna Pirates (3 consecutive titles: Season 3, 4, 5)",
      "categories": [
          "Men's Professional"
      ]
  },
  "Kabaddi World Cup": {
      "founded": 2004,
      "format": "Standard International Tournament",
      "frequency": "Quadrennial",
      "venue": "India",
      "trophy": "Kabaddi World Cup Trophy",
      "recordHolder": "India (Unbeaten 3 World Cup titles: 2004, 2007, 2016)",
      "categories": [
          "Men's International"
      ]
  },
  "FIDE Candidates Tournament": {
      "founded": 1950,
      "format": "8-Player Double Round-Robin",
      "frequency": "Biennial",
      "venue": "Host City (Toronto, Madrid)",
      "trophy": "Candidates Winner Qualifies for World Championship Match",
      "recordHolder": "Ian Nepomniachtchi, Viswanathan Anand, Garry Kasparov",
      "categories": [
          "Open Section",
          "Women's Candidates"
      ]
  },
  "Chess Olympiad": {
      "founded": 1927,
      "format": "11-Round Swiss Team Tournament",
      "frequency": "Biennial",
      "venue": "Rotating Global Host Cities (Budapest, Chennai)",
      "trophy": "Hamilton-Russell Cup (Open) & Vera Menchik Cup (Women)",
      "recordHolder": "Soviet Union (18 golds) / Russia (6) / India (2024 Double Gold Sweep)",
      "categories": [
          "Open Team (4 Boards)",
          "Women's Team (4 Boards)"
      ]
  },
  // Cricket
  "Indian Premier League": { founded: 2008, format: "T20 Franchise League", frequency: "Annual (March–May)", venue: "India (Home & Away stadiums)", trophy: "IPL Trophy", recordHolder: "Chennai Super Kings & Mumbai Indians (5 titles each)", categories: ["Men's Franchise"] },
  "ICC Men's T20 World Cup": { founded: 2007, format: "T20 International", frequency: "Biennial", venue: "Rotating Host Nations", trophy: "ICC T20 World Cup Trophy", recordHolder: "West Indies, England, India (2 titles each)", categories: ["Men's International"] },
  "The Ashes": { founded: 1882, format: "5-Test Match Series", frequency: "Biennial", venue: "England & Australia alternating", trophy: "The Ashes Urn (replica)", recordHolder: "Australia (34 series wins)", categories: ["Men's Test"] },
  "ICC Cricket World Cup": { founded: 1975, format: "50-over ODI", frequency: "Quadrennial", venue: "Rotating Host Nations", trophy: "ICC Cricket World Cup Trophy", recordHolder: "Australia (6 titles)", categories: ["Men's International"] },

  // Football
  "FIFA World Cup": { founded: 1930, format: "National Teams Tournament", frequency: "Quadrennial", venue: "Rotating Host Nations", trophy: "FIFA World Cup Trophy", recordHolder: "Brazil (5 titles)", categories: ["Men's National Teams"] },
  "UEFA Champions League": { founded: 1955, format: "European Club Championship", frequency: "Annual (Sept–June)", venue: "Europe-wide / Neutral Final", trophy: "European Champion Clubs' Cup", recordHolder: "Real Madrid (15 titles)", categories: ["Men's Club"] },
  "Premier League": { founded: 1992, format: "20-Club Double Round-Robin", frequency: "Annual (Aug–May)", venue: "England & Wales", trophy: "Premier League Trophy", recordHolder: "Manchester United (13 titles)", categories: ["Men's Club"] },
  "UEFA European Championship": { founded: 1960, format: "European National Teams", frequency: "Quadrennial", venue: "Rotating European Hosts", trophy: "Henri Delaunay Trophy", recordHolder: "Spain (4 titles)", categories: ["Men's National Teams"] },
  "FA Cup": { founded: 1871, format: "Single-Elimination Knockout", frequency: "Annual (Aug–May)", venue: "England (Wembley Stadium Final)", trophy: "The FA Cup Trophy", recordHolder: "Arsenal (14 titles)", categories: ["Men's Club"] },

  // Tennis (Flagship Grand Slams with ALL 5 categories)
  "Wimbledon": { founded: 1877, format: "Grand Slam Knockout", frequency: "Annual (June–July)", venue: "All England Lawn Tennis Club (London, Grass)", trophy: "Gentlemen's Singles Trophy / Venus Rosewater Dish", recordHolder: "Roger Federer (8 Men's) / Martina Navratilova (9 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "Roland-Garros": { founded: 1891, format: "Grand Slam Knockout", frequency: "Annual (May–June)", venue: "Stade Roland Garros (Paris, Clay)", trophy: "Coupe des Mousquetaires / Coupe Suzanne Lenglen", recordHolder: "Rafael Nadal (14 Men's) / Chris Evert (7 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "Australian Open": { founded: 1905, format: "Grand Slam Knockout", frequency: "Annual (January)", venue: "Melbourne Park (Melbourne, Hard)", trophy: "Norman Brookes Challenge Cup / Daphne Akhurst Memorial Cup", recordHolder: "Novak Djokovic (10 Men's) / Margaret Court (11 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "US Open": { founded: 1881, format: "Grand Slam Knockout", frequency: "Annual (Aug–Sept)", venue: "USTA Billie Jean King National Tennis Center (New York, Hard)", trophy: "US Open Championship Trophy", recordHolder: "Jimmy Connors, Pete Sampras, Roger Federer (5 Men's) / Chris Evert, Serena Williams (6 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "Olympic Tennis": { founded: 1896, format: "Olympic Tournament", frequency: "Quadrennial", venue: "Host Olympic Tennis Centre", trophy: "Olympic Gold Medal", recordHolder: "Andy Murray (2 Men's Golds) / Venus Williams (4 Career Golds)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },

  // Badminton (Flagship with all categories)
  "All England Open": { founded: 1899, format: "Super 1000 Knockout", frequency: "Annual (March)", venue: "Utilita Arena Birmingham (England)", trophy: "All England Trophy", recordHolder: "Lin Dan (6 Men's) / Judy Devlin (10 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "BWF World Championships": { founded: 1977, format: "World Championship Knockout", frequency: "Annual (except Olympic years)", venue: "Rotating Global Cities", trophy: "BWF World Championship Gold", recordHolder: "Lin Dan (5 Men's) / Carolina Marín (3 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "Indonesia Open": { founded: 1982, format: "Super 1000 Knockout", frequency: "Annual (June)", venue: "Istora Senayan (Jakarta, Indonesia)", trophy: "Indonesia Open Cup", recordHolder: "Taufik Hidayat, Lee Chong Wei, Ardy Wiranata (6 Men's each)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },

  // Table Tennis (Flagship with all categories)
  "World Table Tennis Championships": { founded: 1926, format: "World Championship Knockout", frequency: "Annual (Singles/Doubles on odd years)", venue: "Rotating Host Cities", trophy: "St. Bride Vase (Men's) / Geist Prize (Women's)", recordHolder: "Ma Long (3 consecutive Men's) / Wang Nan, Ding Ning (3 Women's)", categories: ["Men's Singles", "Women's Singles", "Men's Doubles", "Women's Doubles", "Mixed Doubles"] },
  "Olympic Table Tennis": { founded: 1988, format: "Olympic Tournament", frequency: "Quadrennial", venue: "Host Olympic Arena", trophy: "Olympic Gold Medal", recordHolder: "Ma Long (6 Olympic Gold Medals)", categories: ["Men's Singles", "Women's Singles", "Mixed Doubles", "Men's Team", "Women's Team"] },

  // Basketball
  "NBA": { founded: 1946, format: "30-Team League & Playoffs", frequency: "Annual (Oct–June)", venue: "United States & Canada", trophy: "Larry O'Brien Championship Trophy", recordHolder: "Boston Celtics (18 titles)", categories: ["Men's Professional"] },
  "EuroLeague": { founded: 1958, format: "European League & Final Four", frequency: "Annual (Oct–May)", venue: "Europe-wide / Neutral Final Four", trophy: "EuroLeague Championship Trophy", recordHolder: "Real Madrid (11 titles)", categories: ["Men's Club"] },

  // Golf
  "The Masters": { founded: 1934, format: "72-Hole Stroke Play", frequency: "Annual (April)", venue: "Augusta National Golf Club (Georgia, USA)", trophy: "Masters Trophy & Green Jacket", recordHolder: "Jack Nicklaus (6 titles)", categories: ["Men's Major"] },
  "The Open": { founded: 1860, format: "72-Hole Stroke Play", frequency: "Annual (July)", venue: "Rotating UK Links Courses", trophy: "The Claret Jug", recordHolder: "Harry Vardon (6 titles)", categories: ["Men's Major"] },
  "Ryder Cup": { founded: 1927, format: "28-Match Team Match Play", frequency: "Biennial (Autumn)", venue: "Alternating US & European Courses", trophy: "The Ryder Cup", recordHolder: "United States (27 wins) / Europe (15 wins)", categories: ["Men's Team"] },

  // Athletics
  "World Athletics Championships": { founded: 1983, format: "Track & Field World Championship", frequency: "Biennial", venue: "Rotating Global Stadiums", trophy: "World Athletics Gold Medals", recordHolder: "United States (Medal Table leaders)", categories: ["Men's Track & Field", "Women's Track & Field", "Mixed Relays"] },
  "Diamond League": { founded: 2010, format: "15-Meeting Global Circuit & Final", frequency: "Annual (May–Sept)", venue: "Global Diamond League venues", trophy: "Diamond Trophy", recordHolder: "Renaud Lavillenie, Christian Taylor, Sandra Perković (7 titles each)", categories: ["Men's Track & Field", "Women's Track & Field"] },

  // Cycling
  "Tour de France": { founded: 1903, format: "21-Stage Grand Tour", frequency: "Annual (July)", venue: "France & neighboring countries", trophy: "Coupe Omnisports (Yellow Jersey)", recordHolder: "Jacques Anquetil, Eddy Merckx, Bernard Hinault, Miguel Indurain (5 wins each)", categories: ["Men's Elite"] },
  "Milan-San Remo": { founded: 1907, format: "One-Day Classic (298 km)", frequency: "Annual (March)", venue: "Milan to Sanremo, Italy", trophy: "Milano-Sanremo Trophy", recordHolder: "Eddy Merckx (7 wins)", categories: ["Men's Monument"] },
  "Liège-Bastogne-Liège": { founded: 1892, format: "One-Day Classic (255 km)", frequency: "Annual (April)", venue: "Ardennes, Belgium", trophy: "La Doyenne Trophy", recordHolder: "Eddy Merckx (5 wins)", categories: ["Men's Monument", "Women's Monument"] },

  // Chess
  "World Chess Championship": { founded: 1886, format: "14-Game Classical Match", frequency: "Biennial", venue: "Host City", trophy: "FIDE World Championship Cup", recordHolder: "Emanuel Lasker, Garry Kasparov, Anatoly Karpov (6 titles each)", categories: ["Classical Match"] },

  // Rugby
  "Six Nations": { founded: 1883, format: "6-Team Annual Round-Robin", frequency: "Annual (Feb–March)", venue: "England, France, Ireland, Italy, Scotland, Wales", trophy: "Six Nations Championship Trophy", recordHolder: "England (29 outright titles) / Wales (28)", categories: ["Men's International"] },
  "The Rugby Championship": { founded: 1996, format: "4-Team Annual Tournament", frequency: "Annual (Aug–Sept)", venue: "New Zealand, South Africa, Australia, Argentina", trophy: "The Rugby Championship Trophy", recordHolder: "New Zealand All Blacks (20 titles)", categories: ["Men's International"] }
};

export const SIDELINE_TOURNAMENT_METADATA = SIDELINE_TOURNAMENT_DETAILS;
