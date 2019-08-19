import { Board, BoardCollection } from "./Board";

const greedy_solution = (pieces, material_size) => {
	let bc = new BoardCollection();
	bc.append(new Board(material_size));

	pieces.sort((a, b) => {
		return b.length - a.length;
	});

	for (let piece of pieces.map(e => ({ ...e }))) {
		let piece_added = false;
		for (let board of bc.contents) {
			if (board.space_remaning >= piece.length) {
				board.push(piece);
				pieces.splice(pieces.indexOf(piece), 1);
				piece_added = true;
				break;
			}
		}
		if (!piece_added) {
			bc.append(new Board(material_size));
			bc.last.push(piece);
			pieces.splice(pieces.indexOf(piece), 1);
		}
	}
	return bc.contents;
};

export default greedy_solution;
// const inp_label = ["iw", "iw", "ih", "ih", "jw", "jh", "jw", "jh", "kw", "kw", "kh", "kh", "w"];
// const inp_arr = [450, 444, 436, 430, 389, 389, 386, 375, 362, 362, 261, 261, 261];

// const final_inp = inp_arr.map((e, i) => ({
//     length: e,
//     label: inp_label[i],
// }));

// for (let board of greedy_solution(final_inp, 2050)) {
//     { items: board.items.map(e => e.label), unused: board.space_remaning });
// }
