import type { juego } from "../../user/HomeJuego";

interface Props {
    juegos: juego[];
}

const GameList = ({ juegos }: Props) => {
    return (
        <ul className="list-group mt-4">
            {juegos.map((juego) => (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={juego.id}>
                    <div className="ms-2 me-auto">
                        <div><strong>{juego.name}</strong></div>
                        <div>Price: ${juego.price}</div>
                        <div>Category: {juego.category.name}</div>
                        <div>Sells: {juego.sells.reduce((sum, s) => sum + s.amount, 0)}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GameList;