import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PLAYERS = ["Jerry", "John", "Stu", "Jarvis"]

export default function Card({num, stratCards, setName, state:{assignmentCache, passedCache}, setState}) {

  const name = assignmentCache[num]
  const hasPassed = !!passedCache[num]
  console.log('NUM', num)
  const borderColor = hasPassed ? 'border-slate-800' : stratCards[num].border
  const invalidPlayers = Object.values(assignmentCache).filter((e, i, a) => a.indexOf(e) !== i)

  const onSetName = (player) => {
    if (!invalidPlayers.includes(player)) {
      setName(num, player)
      toast(`${player} has been assigned to #${num}`)
    }
  }

  const onTogglePass = () => setState(cache => ({ ...cache, passedCache: { ...cache.passedCache, [num]: !hasPassed } }))

  return (
    <div className={["my-3 flex justify-evenly flex-col grow items-center border border-8 rounded-3xl", `${borderColor}`].join(" ")}>
      <p className="text-9xl">{num}</p>
      <div style={{
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginLeft: 20, marginRight: 20,
      }}>
        {name ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            pointer: 'cursor',
            justifyContent: 'space-between',
            gap: 10,
          }}>
            <p style={{flexGrow:1, minWidth: 200, textTransform: 'uppercase', fontSize: 25}}>{name}</p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}>
              {PLAYERS.map((player) => (
                <div
                  key={player}
                  onClick={() => onSetName(player)}
                  style={{
                    cursor: invalidPlayers.includes(player) ? 'not-allowed' : 'pointer',
                    fontSize: 25, textTransform: 'uppercase',
                    background: '#303030',
                    padding: 5,
                    textDecoration: invalidPlayers.includes(player) ? 'line-through' : 'none',
                  }
                  }>
                  {player}
                </div>
              ))}
          </div>
        )}
      </div>
      {name && <div style={{ cursor: 'pointer' }} onClick={onTogglePass}>
        <p>{hasPassed ? 'Un-Pass' : 'Pass'}</p>
      </div>}
    </div>
  );

}
