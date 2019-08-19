export class Board {
	constructor(material_size) {
		this.board_length = material_size;
		this.items = [];
		this.space_remaning = this.board_length;
	}

	push(piece) {
		if (this.space_remaning >= piece.length) {
			this.items.push(piece);
			this.space_remaning -= piece.length;
		}
	}

	remove(piece) {
		if (this.items.includes(piece.length)) {
			this.items.splice(this.items.indexOf(piece), 1);
			this.space_remaining += piece.length;
		}
	}
}

export class BoardCollection {
	constructor() {
		this.contents = [];
		this.last = null;
	}

	append(board) {
		this.contents.push(board);
		this.last = this.contents[this.contents.length - 1];
	}
}
