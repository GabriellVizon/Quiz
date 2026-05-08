// ===== DADOS DAS PERGUNTAS =====
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;
let perguntaRespondida = false;
let vidas = 3;
let generoAtual = null;
let quizAtivo = false;
let poderUsado = false;
let poderEfeito = null;

const poderesDisponiveis = {
    naruto: { nome: 'Modo Sábio', desc: '+50 XP no próximo acerto', icone: '🍃', tipo: 'xp_bonus' },
    goku: { nome: 'Kamehameha', desc: 'Elimina 2 opções erradas', icone: '⚡', tipo: 'eliminar_opcoes' },
    luffy: { nome: 'Gomu Gomu', desc: 'Pula a questão sem perder vida', icone: '🪨', tipo: 'pular_questao' },
    pikachu: { nome: 'Choque do Trovão', desc: 'Revela a resposta certa por 2s', icone: '⚡', tipo: 'revelar_resposta' },
    tanjiro: { nome: 'Respiração da Água', desc: 'Recupera 1 vida', icone: '🌊', tipo: 'curar_vida' },
    gojo: { nome: 'Roxo (Hollow Purple)', desc: 'PASSAR AUTOMÁTICO na questão! 💜', icone: '💜', tipo: 'passar_questao' },
    mikasa: { nome: 'Lâminas Titânicas', desc: 'Dobra moedas no próximo acerto', icone: '🗡️', tipo: 'moedas_dobradas' },
    sailor: { nome: 'Moon Healing', desc: 'Restaura TODAS as vidas!', icone: '🌙', tipo: 'curar_tudo' },
    vegeta: { nome: 'Final Flash', desc: 'Triplica XP no próximo acerto', icone: '💥', tipo: 'xp_triplo' },
    itachi: { nome: 'Tsukuyomi', desc: 'Revela a resposta certa por 3s', icone: '🔮', tipo: 'revelar_tempo' }
};

const multiplicadoresRank = {
    bronze: 1.1, prata: 1.3, ouro: 1.5, platina: 1.7, diamante: 2.0, mestre: 2.5, desafiante: 3.0
};

const perguntasGames = [
    { pergunta: "Qual é o nome do protagonista da série de jogos 'The Legend of Zelda'?", opcoes: ["Zelda", "Ganon", "Link", "Sheik"], correta: 2, cat: 'games' },
    { pergunta: "Em 'Minecraft', qual picareta é necessária para minerar diamante?", opcoes: ["Madeira", "Pedra", "Ferro", "Ouro"], correta: 2, cat: 'games' },
    { pergunta: "Qual jogo popularizou o gênero Battle Royale?", opcoes: ["Fortnite", "PUBG", "Apex Legends", "H1Z1"], correta: 1, cat: 'games' },
    { pergunta: "Qual empresa criou o 'Super Mario'?", opcoes: ["Sega", "Sony", "Microsoft", "Nintendo"], correta: 3, cat: 'games' },
    { pergunta: "Em 'Among Us', quantos impostores podem haver em uma partida com 10 jogadores?", opcoes: ["1", "2", "3", "4"], correta: 2, cat: 'games' },
    { pergunta: "RPG de mundo aberto da CD Projekt Red?", opcoes: ["Skyrim", "The Witcher 3", "Dark Souls", "Elden Ring"], correta: 1, cat: 'games' },
    { pergunta: "Mascote do jogo 'Sonic the Hedgehog'?", opcoes: ["Lobo", "Ouriço", "Raposa", "Gato"], correta: 1, cat: 'games' },
    { pergunta: "Moeda virtual do 'Fortnite'?", opcoes: ["V-Bucks", "R6 Credits", "COD Points", "Apex Coins"], correta: 0, cat: 'games' },
    { pergunta: "Jogo mais vendido de todos os tempos?", opcoes: ["GTA V", "Tetris", "Minecraft", "Wii Sports"], correta: 2, cat: 'games' },
    { pergunta: "Golpe especial mais famoso de Ryu em 'Street Fighter'?", opcoes: ["Sonic Boom", "Hadouken", "Shoryuken", "Tatsumaki"], correta: 1, cat: 'games' },
    { pergunta: "Primeiro jogo com o personagem 'Solid Snake'?", opcoes: ["Metal Gear Solid", "Metal Gear", "Snake's Revenge", "MGS2"], correta: 1, cat: 'games' },
    { pergunta: "Tipo do Pokémon inicial 'Charmander'?", opcoes: ["Água", "Planta", "Fogo", "Elétrico"], correta: 2, cat: 'games' },
    { pergunta: "Qual jogo originou o termo 'Roguelike'?", opcoes: ["Rogue", "Spelunky", "Isaac", "Hades"], correta: 0, cat: 'games' },
    { pergunta: "Empresa criadora da Unreal Engine?", opcoes: ["Valve", "Epic Games", "Unity", "Ubisoft"], correta: 1, cat: 'games' },
    { pergunta: "Filho de Kratos em 'God of War' (2018)?", opcoes: ["Loki", "Atreus", "Thor", "Freyr"], correta: 1, cat: 'games' },
    { pergunta: "Qual plataforma é da Microsoft?", opcoes: ["PlayStation", "Xbox", "Switch", "Steam Deck"], correta: 1, cat: 'games' },
    { pergunta: "Personagem principal de 'Halo'?", opcoes: ["Cortana", "Master Chief", "Arbiter", "Sargeant"], correta: 1, cat: 'games' },
    { pergunta: "Primeiro e-sport na TV aberta brasileira?", opcoes: ["LoL", "Counter-Strike", "FIFA", "Street Fighter"], correta: 1, cat: 'games' },
    { pergunta: "Nome do robô ajudante em 'Portal 2'?", opcoes: ["GLaDOS", "Wheatley", "Atlas", "P-body"], correta: 1, cat: 'games' },
    { pergunta: "Criador de 'Metal Gear Solid'?", opcoes: ["Shigeru Miyamoto", "Hideo Kojima", "Fumito Ueda", "Yoko Taro"], correta: 1, cat: 'games' },
    { pergunta: "Em 'GTA V', qual cidade o jogo se passa?", opcoes: ["Liberty City", "Los Santos", "Vice City", "San Fierro"], correta: 1, cat: 'games' },
    { pergunta: "Franquia de terror que popularizou 'survival horror'?", opcoes: ["Silent Hill", "Resident Evil", "Fatal Frame", "Alone in the Dark"], correta: 1, cat: 'games' },
    { pergunta: "Jogo que inspirou o termo 'Metroidvania'?", opcoes: ["Castlevania + Metroid", "Hollow Knight", "Dead Cells", "Ori"], correta: 0, cat: 'games' },
    { pergunta: "Personagem principal da série 'Tomb Raider'?", opcoes: ["Lara Croft", "Nathan Drake", "Jill Valentine", "Samus Aran"], correta: 0, cat: 'games' },
    { pergunta: "Estúdio criador de 'Red Dead Redemption 2'?", opcoes: ["Rockstar", "Ubisoft", "EA", "Bethesda"], correta: 0, cat: 'games' },
    { pergunta: "Qual jogo tem o subtítulo 'Breath of the Wild'?", opcoes: ["Zelda", "Xenoblade", "Final Fantasy", "Dragon Quest"], correta: 0, cat: 'games' },
    { pergunta: "MOBA mais popular do mundo?", opcoes: ["Dota 2", "League of Legends", "Heroes of the Storm", "Smite"], correta: 1, cat: 'games' },
    { pergunta: "Personagem principal de 'Devil May Cry'?", opcoes: ["Vergil", "Dante", "Nero", "Sparda"], correta: 1, cat: 'games' },
    { pergunta: "Ano de lançamento do primeiro 'Super Mario Bros'?", opcoes: ["1983", "1985", "1987", "1990"], correta: 1, cat: 'games' },
    { pergunta: "Jogo eletrônico mais antigo conhecido?", opcoes: ["Pong", "Spacewar!", "Tennis for Two", "Computer Space"], correta: 2, cat: 'games' },
    { pergunta: "Nome do protagonista de 'Persona 5'?", opcoes: ["Ren Amamiya", "Yu Narukami", "Makoto Yuki", "Joker"], correta: 3, cat: 'games' },
    { pergunta: "Console mais vendido da história?", opcoes: ["PS2", "PS4", "Switch", "DS"], correta: 0, cat: 'games' },
    { pergunta: "Criador de 'The Legend of Zelda'?", opcoes: ["Miyamoto", "Kojima", "Aonuma", "Yoshiaki Koizumi"], correta: 0, cat: 'games' },
    { pergunta: "Em 'Overwatch', qual herói usa uma katana?", opcoes: ["Genji", "Hanzo", "Reinhardt", "Tracer"], correta: 0, cat: 'games' },
    { pergunta: "Sistema de 'souls' popularizado por qual jogo?", opcoes: ["Dark Souls", "Elden Ring", "Bloodborne", "Demon's Souls"], correta: 3, cat: 'games' },
    { pergunta: "Gênero de 'Stardew Valley'?", opcoes: ["RPG", "Simulação/Fazenda", "Estratégia", "Puzzle"], correta: 1, cat: 'games' },
    { pergunta: "Nome do antagonista em 'Shadow of the Colossus'?", opcoes: ["Dormin", "Emperor", "Malus", "Agro"], correta: 0, cat: 'games' },
    { pergunta: "Ator que dublou Geralt em inglês em 'The Witcher 3'?", opcoes: ["Henry Cavill", "Doug Cockle", "Peter Kenny", "Tom Ellis"], correta: 1, cat: 'games' }
];

const perguntasFilmes = [
    { pergunta: "Ator do Coringa em 'O Cavaleiro das Trevas' (2008)?", opcoes: ["Phoenix", "Nicholson", "Heath Ledger", "Leto"], correta: 2, cat: 'filmes' },
    { pergunta: "Pílulas que Morpheus oferece em 'Matrix'?", opcoes: ["Azul e Vermelha", "Vermelha e Azul", "Verde e Azul", "Preta e Branca"], correta: 1, cat: 'filmes' },
    { pergunta: "Robô protagonista de 'Wall-E'?", opcoes: ["EVE", "Wall-E", "M-O", "AUTO"], correta: 1, cat: 'filmes' },
    { pergunta: "Quem empunha o Mjolnir em 'Vingadores: Ultimato'?", opcoes: ["Thor", "Capitão América", "Homem de Ferro", "Hulk"], correta: 1, cat: 'filmes' },
    { pergunta: "Primeiro filme da Pixar?", opcoes: ["Nemo", "Monstros S.A.", "Toy Story", "Os Incríveis"], correta: 2, cat: 'filmes' },
    { pergunta: "Robô de Cooper em 'Interestelar'?", opcoes: ["TARS", "CASE", "KIPP", "HAL"], correta: 0, cat: 'filmes' },
    { pergunta: "Ator que interpretou Wolverine nos X-Men?", opcoes: ["Ryan Reynolds", "Hugh Jackman", "Patrick Stewart", "James Marsden"], correta: 1, cat: 'filmes' },
    { pergunta: "Velocidade para viajar no tempo em 'De Volta para o Futuro'?", opcoes: ["60 mph", "88 mph", "100 mph", "120 mph"], correta: 1, cat: 'filmes' },
    { pergunta: "Filme da Disney com o personagem 'Mufasa'?", opcoes: ["O Rei Leão", "Branca de Neve", "Aladdin", "A Bela e a Fera"], correta: 0, cat: 'filmes' },
    { pergunta: "Caçador de recompensas mais famoso de 'Star Wars'?", opcoes: ["Jango Fett", "Boba Fett", "Din Djarin", "Cad Bane"], correta: 1, cat: 'filmes' },
    { pergunta: "Filme que tornou Keanu Reeves conhecido como 'John Wick'?", opcoes: ["Speed", "Matrix", "John Wick", "Point Break"], correta: 2, cat: 'filmes' },
    { pergunta: "Dinossauro protagonista de 'Jurassic Park'?", opcoes: ["T-Rex", "Velociraptor", "Brachiosaurus", "Triceratops"], correta: 0, cat: 'filmes' },
    { pergunta: "Portador do Um Anel em 'O Senhor dos Anéis'?", opcoes: ["Gandalf", "Aragorn", "Frodo", "Legolas"], correta: 2, cat: 'filmes' },
    { pergunta: "Animação da Pixar com o rato Remy?", opcoes: ["Ratatouille", "Up", "Divertida Mente", "Toy Story 3"], correta: 0, cat: 'filmes' },
    { pergunta: "Casas de Hogwarts em 'Harry Potter'?", opcoes: ["3", "4", "5", "6"], correta: 1, cat: 'filmes' },
    { pergunta: "Ditador de 'Mad Max: Estrada da Fúria'?", opcoes: ["Immortan Joe", "Rictus", "The Bullet Farmer", "The People Eater"], correta: 0, cat: 'filmes' },
    { pergunta: "Diretor de 'Clube da Luta'?", opcoes: ["Christopher Nolan", "David Fincher", "Quentin Tarantino", "Ridley Scott"], correta: 1, cat: 'filmes' },
    { pergunta: "Modelo do exterminador que protege John Connor em 'O Exterminador do Futuro 2'?", opcoes: ["T-800", "T-1000", "TX", "T-850"], correta: 0, cat: 'filmes' },
    { pergunta: "Animação da Disney sobre o Dia dos Mortos?", opcoes: ["Viva: A Vida é uma Festa", "Frozen", "Moana", "Encanto"], correta: 0, cat: 'filmes' },
    { pergunta: "Ator que interpretou o agente K em 'Blade Runner 2049'?", opcoes: ["Harrison Ford", "Ryan Gosling", "Jared Leto", "Dave Bautista"], correta: 1, cat: 'filmes' },
    { pergunta: "Dragão de Soluço em 'Como Treinar Seu Dragão'?", opcoes: ["Fúria da Noite", "Banguela", "Furia Mortal", "Furia Celestial"], correta: 1, cat: 'filmes' },
    { pergunta: "Planeta deserto em 'Duna' (2021)?", opcoes: ["Caladan", "Arrakis", "Giedi Prime", "Salusa Secundus"], correta: 1, cat: 'filmes' },
    { pergunta: "Atriz que interpretou a Mulher-Maravilha?", opcoes: ["Scarlett Johansson", "Gal Gadot", "Margot Robbie", "Brie Larson"], correta: 1, cat: 'filmes' },
    { pergunta: "Primeira aparição do Pantera Negra no MCU?", opcoes: ["Pantera Negra", "Guerra Civil", "Era de Ultron", "Homem de Ferro 2"], correta: 1, cat: 'filmes' },
    { pergunta: "Filme de maior bilheteria da história (sem correção)?", opcoes: ["Vingadores: Ultimato", "Avatar", "Titanic", "Star Wars: O Despertar da Força"], correta: 1, cat: 'filmes' },
    { pergunta: "Nome do T-Rex em 'Jurassic Park'?", opcoes: ["Rexy", "Rex", "Tyrant", "Raptor"], correta: 0, cat: 'filmes' },
    { pergunta: "Qual filme ganhou o Oscar de Melhor Filme em 2020?", opcoes: ["1917", "Parasita", "Coringa", "Era Uma Vez em Hollywood"], correta: 1, cat: 'filmes' },
    { pergunta: "Diretor de 'Interestelar' e 'A Origem'?", opcoes: ["Nolan", "Villeneuve", "Fincher", "Spielberg"], correta: 0, cat: 'filmes' },
    { pergunta: "Ator principal de 'Gladiador' (2000)?", opcoes: ["Russell Crowe", "Joaquin Phoenix", "Brad Pitt", "Matt Damon"], correta: 0, cat: 'filmes' },
    { pergunta: "Desenho animado com o personagem 'Bob Esponja'?", opcoes: ["Bob Esponja", "Patrick", "Lula Molusco", "Siriguejo"], correta: 0, cat: 'filmes' },
    { pergunta: "Ano de lançamento de 'Matrix'?", opcoes: ["1997", "1998", "1999", "2000"], correta: 2, cat: 'filmes' },
    { pergunta: "Herói da Marvel que pode ficar invisível?", opcoes: ["Homem Invisível", "Susan Storm", "Mística", "Visão"], correta: 1, cat: 'filmes' },
    { pergunta: "Nome verdadeiro do Darth Vader?", opcoes: ["Luke", "Anakin", "Obi-Wan", "Palpatine"], correta: 1, cat: 'filmes' },
    { pergunta: "Em 'Toy Story', qual é o nome do caubói?", opcoes: ["Woody", "Buzz", "Jessie", "Rex"], correta: 0, cat: 'filmes' },
    { pergunta: "Filme onde o personagem 'Forrest Gump' aparece?", opcoes: ["Forrest Gump", "Náufrago", "Philadelphia", "O Poderoso Chefão"], correta: 0, cat: 'filmes' },
    { pergunta: "Nave espacial em 'Alien - O 8º Passageiro'?", opcoes: ["Nostromo", "Sulaco", "Prometheus", "Enterprise"], correta: 0, cat: 'filmes' },
    { pergunta: "País de origem dos filmes do 'Estúdio Ghibli'?", opcoes: ["China", "Japão", "Coreia", "Tailândia"], correta: 1, cat: 'filmes' },
    { pergunta: "Série de TV zumbi mais famosa?", opcoes: ["The Walking Dead", "Z Nation", "iZombie", "Black Summer"], correta: 0, cat: 'filmes' },
    { pergunta: "Qual filme tem o famoso 'discurso 'You Can't Handle the Truth'?'?", opcoes: ["Questão de Honra", "O Pavilhão dos Dourados", "O Advogado do Diabo", "12 Homens e uma Sentença"], correta: 0, cat: 'filmes' },
    { pergunta: "Quantos filmes 'O Poderoso Chefão' existem?", opcoes: ["1", "2", "3", "4"], correta: 2, cat: 'filmes' }
];

// ===== PIXEL ART =====
const pixelCharacters = {
    naruto: {
        nome: 'Naruto Uzumaki', anime: 'Naruto', preco: 200,
        palette: ['', '#e8872a', '#f5c842', '#f5deb3', '#222', '#fff', '#3d7ed3'],
        pixels: ['..1111..', '.111111.', '.135531.', '.136631.', '.111111.', '..1111..', '...44...', '..4444..', '44...44.', '.4...4..']
    },
    goku: {
        nome: 'Goku', anime: 'Dragon Ball', preco: 250,
        palette: ['', '#e85d2a', '#f5c842', '#f5deb3', '#222', '#3d7ed3'],
        pixels: ['..1111..', '.133331.', '.111111.', '.355553.', '.111111.', '..1111..', '..4..4..', '.444444.', '44.44.44', '4..44..4']
    },
    luffy: {
        nome: 'Monkey D. Luffy', anime: 'One Piece', preco: 200,
        palette: ['', '#e8872a', '#f5deb3', '#222', '#c43a31', '#f5c842'],
        pixels: ['..1111..', '.111111.', '.123321.', '.124421.', '.111111.', '..1111..', '...55...', '..5555..', '55...55.', '5...5...']
    },
    pikachu: {
        nome: 'Pikachu', anime: 'Pokémon', preco: 150,
        palette: ['', '#f5c842', '#f5deb3', '#c43a31', '#222'],
        pixels: ['..11..11', '.111111.', '.112211.', '.111111.', '..1111..', '.111111.', '..2..2..', '.222222.', '22...22.', '2...2...']
    },
    tanjiro: {
        nome: 'Tanjiro Kamado', anime: 'Demon Slayer', preco: 200,
        palette: ['', '#2d6b3f', '#8b4513', '#f5deb3', '#222', '#c43a31'],
        pixels: ['.111111.', '11111111', '11...11.', '.133331.', '..1111..', '..1111..', '.144441.', '..1441..', '...44...', '..44.44.']
    },
    gojo: {
        nome: 'Satoru Gojo', anime: 'Jujutsu Kaisen', preco: 300,
        palette: ['', '#fff', '#f5deb3', '#222', '#b8d4e3'],
        pixels: ['..1111..', '.111111.', '.122221.', '.122221.', '.111111.', '..1111..', '..4..4..', '.444444.', '44.44.44', '4..44..4']
    },
    mikasa: {
        nome: 'Mikasa Ackerman', anime: 'Attack on Titan', preco: 220,
        palette: ['', '#222', '#555', '#f5deb3', '#c43a31'],
        pixels: ['..1111..', '.111111.', '.132231.', '.122221.', '.111111.', '..1111..', '...44...', '..4444..', '44...44.', '4...4...']
    },
    sailor: {
        nome: 'Sailor Moon', anime: 'Sailor Moon', preco: 180,
        palette: ['', '#f5c842', '#e84a8a', '#f5deb3', '#fff', '#3d7ed3'],
        pixels: ['.111111.', '11555511', '11333511', '11111111', '..1111..', '.111111.', '.14..41.', '..1441..', '...44...', '..44.44.']
    },
    vegeta: {
        nome: 'Vegeta', anime: 'Dragon Ball', preco: 260,
        palette: ['', '#3d7ed3', '#f5c842', '#f5deb3', '#222', '#fff'],
        pixels: ['..1111..', '.133331.', '.111111.', '.355553.', '.111111.', '..1111..', '...44...', '..4444..', '44...44.', '4...4...']
    },
    itachi: {
        nome: 'Itachi Uchiha', anime: 'Naruto', preco: 280,
        palette: ['', '#222', '#8b0000', '#f5deb3', '#fff', '#c43a31'],
        pixels: ['.111111.', '12222221', '12222221', '.111111.', '.111111.', '..1111..', '..4..4..', '.444444.', '44.44.44', '4..44..4']
    }
};

function renderPixel(canvas, charData, size) {
    const p = size || 4;
    const ctx = canvas.getContext('2d');
    const rows = charData.pixels.length;
    const cols = charData.pixels[0].length;
    canvas.width = cols * p;
    canvas.height = rows * p;
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const idx = charData.pixels[y][x];
            const c = parseInt(idx, 16);
            if (c === 0 || isNaN(c)) continue;
            ctx.fillStyle = charData.palette[c];
            ctx.fillRect(x * p, y * p, p, p);
        }
    }
}

// ===== SISTEMA DE USER =====
const XP_BASE = 30;
const XP_NIVEL_BASE = 80;
const FATOR_NIVEL = 1.08;
const NIVEL_MAX = 69;
const MOEDAS_ACERTO = 5;
const MOEDAS_ERRO = 1;
const BONUS_STREAK_MAX = 10;

let user = carregarUser();

function xpParaProximoNivel(nivel) {
    return Math.floor(XP_NIVEL_BASE * Math.pow(FATOR_NIVEL, nivel - 1));
}

function carregarUser() {
    const salvo = localStorage.getItem('quizUser');
    if (salvo) {
        const u = JSON.parse(salvo);
        u.xpProximoNivel = xpParaProximoNivel(u.nivel);
        return u;
    }
    return {
        nivel: 1, xp: 0, xpProximoNivel: xpParaProximoNivel(1),
        moedas: 0, streak: 0, maxStreak: 0,
        totalAcertos: 0, totalPerguntas: 0,
        boostAtivo: null,
        inventario: { personagens: [], ranks: [], posts: [] },
        equipado: { personagem: null, rank: null, post: null }
    };
}

function salvarUser() {
    user.xpProximoNivel = xpParaProximoNivel(user.nivel);
    localStorage.setItem('quizUser', JSON.stringify(user));
}

function mostrarPopup(texto, tipo) {
    const container = document.getElementById('floatingPopups');
    const el = document.createElement('div');
    el.className = `floating-popup ${tipo}`;
    el.innerText = texto;
    container.appendChild(el);
    setTimeout(() => el.remove(), 1300);
}

function ganharXp(quantia) {
    const multBoost = user.boostAtivo ? user.boostAtivo.multiplicador : 1;
    const rankAtivo = user.equipado.rank ? lojaRanks.find(r => r.id === user.equipado.rank) : null;
    const multRank = rankAtivo ? rankAtivo.multiplicadorXP : 1
    ;
    const total = Math.floor(quantia * multBoost * multRank);
    if (total > 0) mostrarPopup(`+${total} XP`, 'xp');
    user.xp += total;
    while (user.xp >= user.xpProximoNivel && user.nivel < NIVEL_MAX) {
        user.xp -= user.xpProximoNivel;
        user.nivel++;
        user.xpProximoNivel = xpParaProximoNivel(user.nivel);
        if (user.nivel === NIVEL_MAX) user.xp = 0;
        mostrarPopup(`⬆ LEVEL ${user.nivel}!`, 'xp');
    }
    if (user.boostAtivo) {
        user.boostAtivo.restantes--;
        if (user.boostAtivo.restantes <= 0) user.boostAtivo = null;
    }
    salvarUser();
    atualizarHUD();
}

function ganharMoedas(quantia) {
    if (quantia > 0) mostrarPopup(`+${quantia} 🪙`, 'coin');
    user.moedas += quantia;
    salvarUser();
    atualizarHUD();
}

// ===== LOJA =====
const lojaBoosts = [
    { id: 'boost2x', nome: 'Boost 2x XP', desc: 'Dobre seu XP por 5 perguntas!', preco: 50, multiplicador: 2, restantes: 5, cor: '#f7971e' },
    { id: 'boost3x', nome: 'Boost 3x XP', desc: 'Triplique seu XP por 5 perguntas!', preco: 120, multiplicador: 3, restantes: 5, cor: '#e84a8a' },
    { id: 'boost5x', nome: 'Boost 5x XP', desc: 'XP QUINTUPLICADO por 3 perguntas!', preco: 200, multiplicador: 5, restantes: 3, cor: '#c43a31' }
];

const lojaRanks = [
    { id: 'bronze', nome: 'Bronze', desc: 'Rank Iniciante', preco: 100, cor: '#cd7f32', icone: '🟤', multiplicadorXP: 1.1 },
    { id: 'prata', nome: 'Prata', desc: 'Rank Intermediário', preco: 250, cor: '#c0c0c0', icone: '🥈', multiplicadorXP: 1.3 },
    { id: 'ouro', nome: 'Ouro', desc: 'Rank Avançado', preco: 500, cor: '#ffd700', icone: '🥇', multiplicadorXP: 1.5 },
    { id: 'platina', nome: 'Platina', desc: 'Rank Elite', preco: 1000, cor: '#e5e4e2', icone: '💎', multiplicadorXP: 1.7 },
    { id: 'diamante', nome: 'Diamante', desc: 'Rank Lendário', preco: 2000, cor: '#b9f2ff', icone: '💠', multiplicadorXP: 2.0 },
    { id: 'mestre', nome: 'Mestre', desc: 'Rank Mestre dos Quizzes', preco: 3500, cor: '#9b59b6', icone: '👑', multiplicadorXP: 2.5 },
    { id: 'desafiante', nome: 'Desafiante', desc: 'Rank Supremo', preco: 5000, cor: '#e74c3c', icone: '🔥', multiplicadorXP: 3.0 }
];

const lojaPosts = [
    { id: 'post_gamer', nome: 'Post Gamer', desc: 'Mostre que é um gamer', preco: 50, conteudo: '🎮 Gamer de verdade!' },
    { id: 'post_nerd', nome: 'Post Nerd', desc: 'Orgulho nerd', preco: 75, conteudo: '🤓 Nível nerd máximo!' },
    { id: 'post_elite', nome: 'Post Elite', desc: 'Você é da elite', preco: 100, conteudo: '🏆 Elite do Quiz!' },
    { id: 'post_lendario', nome: 'Post Lendário', desc: 'Apenas lendas têm esse', preco: 200, conteudo: '⭐ LENDÁRIO! ⭐' },
    { id: 'post_otaku', nome: 'Post Otaku', desc: 'Para amantes de anime', preco: 80, conteudo: '🎌 Cultura Otaku 🎌' },
    { id: 'post_hokage', nome: 'Post Hokage', desc: 'O caminho do Hokage', preco: 150, conteudo: '🔥 Caminho do Hokage 🔥' }
];

// ===== FUNÇÕES DO QUIZ =====
function embaralhar(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function iniciarQuiz(genero) {
    generoAtual = genero;
    let lista;
    if (genero === 'games') lista = [...perguntasGames];
    else if (genero === 'filmes') lista = [...perguntasFilmes];
    else lista = [...perguntasGames, ...perguntasFilmes];

    perguntas = embaralhar(lista).slice(0, Math.min(20, lista.length));
    if (perguntas.length < 5) { perguntas = embaralhar(lista).slice(0, 5); }

    perguntaAtual = 0;
    pontuacao = 0;
    vidas = 3;
    perguntaRespondida = false;
    quizAtivo = true;
    poderUsado = false;
    poderEfeito = null;

    document.getElementById('generoSelecao').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    atualizarVidas();
    atualizarHUD();
    exibirPergunta();
}

function exibirPergunta() {
    if (!quizAtivo || perguntas.length === 0) return;
    const total = perguntas.length;
    const item = perguntas[perguntaAtual];

    document.getElementById("pergunta").innerText = item.pergunta;
    document.getElementById("contador").innerText = `Questão ${perguntaAtual + 1} de ${total}`;
    document.getElementById("pontuacaoParcial").innerText = `Acertos: ${pontuacao}`;

    const barra = document.getElementById("progresso");
    barra.style.width = `${((perguntaAtual + 1) / total) * 100}%`;

    const divOpcoes = document.getElementById("opcoes");
    divOpcoes.innerHTML = "";
    document.getElementById("btnProximo").style.display = "none";
    document.getElementById("resultado").innerText = "";
    const poderContainer = document.getElementById("poderContainer");
    if (poderContainer) poderContainer.remove();
    perguntaRespondida = false;

    // Power button
    const personId = user.equipado.personagem;
    if (personId && poderesDisponiveis[personId] && !poderUsado) {
        const poder = poderesDisponiveis[personId];
        const container = document.createElement("div");
        container.id = "poderContainer";
        container.style.cssText = 'text-align:center;margin-top:16px;';
        container.innerHTML = `
            <button onclick="usarPoder()" class="btn-poder" id="btnPoder">
                ${poder.icone} ${poder.nome}: ${poder.desc}
            </button>`;
        divOpcoes.parentNode.insertBefore(container, divOpcoes.nextSibling);
    }

    item.opcoes.forEach((opcao, index) => {
        const btn = document.createElement("button");
        btn.innerText = opcao;
        btn.classList.add("opcao");
        btn.onclick = () => verificarResposta(index);
        divOpcoes.appendChild(btn);
    });
}

function verificarResposta(selecionada) {
    if (perguntaRespondida || !quizAtivo) return;
    perguntaRespondida = true;
    const item = perguntas[perguntaAtual];
    const correta = item.correta;
    const res = document.getElementById("resultado");
    const botoes = document.querySelectorAll(".opcao");

    user.totalPerguntas++;
    botoes.forEach((b, i) => {
        b.disabled = true;
        if (i === correta) b.classList.add("correta");
        else if (i === selecionada && selecionada !== correta) b.classList.add("errada");
    });

    if (selecionada === correta) {
        res.innerText = "Correto!";
        res.style.color = "#4ade80";
        pontuacao++;
        user.totalAcertos++;
        user.streak++;
        if (user.streak > user.maxStreak) user.maxStreak = user.streak;
        const bonusStreak = Math.min(user.streak, BONUS_STREAK_MAX);
        let xpGanho = XP_BASE + (bonusStreak * 2);
        let moedasGanho = MOEDAS_ACERTO + Math.floor(bonusStreak / 2);
        if (poderEfeito === 'xp_bonus') { xpGanho += 50; poderEfeito = null; }
        if (poderEfeito === 'moedas_dobradas') { moedasGanho *= 2; poderEfeito = null; }
        if (poderEfeito === 'xp_triplo') { xpGanho *= 3; poderEfeito = null; }
        ganharXp(xpGanho);
        ganharMoedas(moedasGanho);
        document.getElementById("btnProximo").style.display = "inline-block";
    } else {
        res.innerText = `Errado! Resposta: ${item.opcoes[correta]}`;
        res.style.color = "#f87171";
        user.streak = 0;
        ganharMoedas(MOEDAS_ERRO);
        perderVida();
    }

    atualizarHUD();
}

function perderVida() {
    vidas--;
    atualizarVidas();
    if (vidas <= 0) {
        quizAtivo = false;
        setTimeout(() => mostrarGameOver(), 600);
    } else {
        document.getElementById("btnProximo").style.display = "inline-block";
    }
}

function atualizarVidas() {
    for (let i = 1; i <= 3; i++) {
        const el = document.getElementById(`vida${i}`);
        if (!el) continue;
        if (i <= vidas) {
            el.className = 'vida';
        } else {
            el.className = 'vida perdida';
        }
    }
}

function mostrarGameOver() {
    poderUsado = false;
    poderEfeito = null;
    const total = perguntas.length;
    document.getElementById('gameoverAcertos').innerText = `Você acertou ${pontuacao} de ${total} perguntas`;
    document.getElementById('gameOverOverlay').classList.add('ativo');
}

function fecharGameOver() {
    document.getElementById('gameOverOverlay').classList.remove('ativo');
    resetarQuiz();
}

function proximaPergunta() {
    if (!quizAtivo) return;
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        exibirPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    quizAtivo = false;
    poderUsado = false;
    poderEfeito = null;
    const total = perguntas.length;
    const pct = Math.round((pontuacao / total) * 100);
    const perfeito = pontuacao === total;

    if (perfeito) {
        const xpBonus = Math.floor((XP_BASE + BONUS_STREAK_MAX * 2) * 0.5);
        ganharXp(xpBonus * 2);
        ganharMoedas((MOEDAS_ACERTO + Math.floor(BONUS_STREAK_MAX / 2)) * 2);
        setTimeout(() => iniciarAnimacaoPerfeito(), 200);
    }

    let mensagem = "Tente novamente!";
    if (pct >= 90) mensagem = "🌟 LENDÁRIO!";
    else if (pct >= 80) mensagem = "✨ Excelente!";
    else if (pct >= 60) mensagem = "🔥 Muito bom!";
    else if (pct >= 40) mensagem = "👍 Bom!";

    const xpGanho = perfeito ? 'Dobrado!' : '';
    document.getElementById("quizContainer").innerHTML = `
        <div class="fim-quiz">
            <h2>${mensagem}</h2>
            <p class="fim-pontuacao">Você acertou ${pontuacao} de ${total}</p>
            <p class="fim-pct">${pct}% de aproveitamento ${xpGanho ? '<br>⭐ Bônus 100%: XP e Moedas dobrados!' : ''}</p>
            <button onclick="resetarQuiz()" class="btn-reiniciar">Jogar Novamente</button>
        </div>
    `;
    atualizarHUD();
}

function resetarQuiz() {
    document.getElementById('quizContainer').innerHTML = `
        <h1>🎮 Quiz Masters</h1>
        <div class="barra-progresso"><div id="progresso"></div></div>
        <div class="header-info">
            <span id="contador">Questão 1 de 20</span>
            <span id="pontuacaoParcial">Acertos: 0</span>
        </div>
        <p id="pergunta"></p>
        <div id="opcoes"></div>
        <p id="resultado"></p>
        <button onclick="proximaPergunta()" id="btnProximo">Próxima ➜</button>
    `;
    quizAtivo = false;
    poderUsado = false;
    poderEfeito = null;
    document.getElementById('generoSelecao').style.display = 'block';
    document.getElementById('quizContainer').style.display = 'none';
    mostrarAba('Quiz');
    vidas = 3;
    atualizarVidas();
}

// ===== SISTEMA DE PODER =====
function usarPoder() {
    if (poderUsado || !quizAtivo || perguntaRespondida) return;
    const personId = user.equipado.personagem;
    if (!personId || !poderesDisponiveis[personId]) return;
    const poder = poderesDisponiveis[personId];
    poderUsado = true;
    const btnPoder = document.getElementById('btnPoder');
    if (btnPoder) btnPoder.remove();

    const res = document.getElementById("resultado");

    switch (poder.tipo) {
        case 'xp_bonus':
            poderEfeito = 'xp_bonus';
            res.innerText = `🍃 ${poder.nome} ativado! +50 XP no próximo acerto!`;
            res.style.color = "#4ade80";
            break;

        case 'eliminar_opcoes':
            const item = perguntas[perguntaAtual];
            const botoes = document.querySelectorAll(".opcao");
            const erradas = [];
            botoes.forEach((b, i) => { if (i !== item.correta && !b.classList.contains('eliminada')) erradas.push(b); });
            embaralhar(erradas).slice(0, 2).forEach(b => {
                b.classList.add('eliminada');
                b.disabled = true;
                b.innerText = '❌';
            });
            res.innerText = `⚡ ${poder.nome}! 2 opções eliminadas!`;
            res.style.color = "#f7971e";
            break;

        case 'pular_questao':
            perguntaRespondida = true;
            res.innerText = `🪨 ${poder.nome}! Pulando questão...`;
            res.style.color = "#4ade80";
            pontuacao++;
            user.totalAcertos++;
            user.totalPerguntas++;
            setTimeout(() => proximaPergunta(), 800);
            break;

        case 'revelar_resposta':
            const item2 = perguntas[perguntaAtual];
            const botoes2 = document.querySelectorAll(".opcao");
            botoes2.forEach((b, i) => {
                if (i === item2.correta) b.classList.add('revelada');
            });
            res.innerText = `⚡ ${poder.nome}! Resposta revelada!`;
            res.style.color = "#ffd200";
            setTimeout(() => {
                botoes2.forEach(b => b.classList.remove('revelada'));
            }, 2000);
            break;

        case 'revelar_tempo':
            const item3 = perguntas[perguntaAtual];
            const botoes3 = document.querySelectorAll(".opcao");
            botoes3.forEach((b, i) => {
                if (i === item3.correta) b.classList.add('revelada');
            });
            res.innerText = `🔮 ${poder.nome}! Resposta revelada!`;
            res.style.color = "#9b59b6";
            setTimeout(() => {
                botoes3.forEach(b => b.classList.remove('revelada'));
            }, 3000);
            break;

        case 'passar_questao':
            perguntaRespondida = true;
            const canvas = document.getElementById('animacaoCanvas');
            canvas.classList.add('ativo');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const item4 = perguntas[perguntaAtual];
            const corretaIdx = item4.correta;
            const cx = canvas.width / 2, cy = canvas.height / 2;
            let explTempo = 0;
            function animarExplosao() {
                if (explTempo > 40) {
                    canvas.classList.remove('ativo');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Auto-answer correctly
                    const botoes4 = document.querySelectorAll(".opcao");
                    botoes4.forEach((b, i) => {
                        b.disabled = true;
                        if (i === corretaIdx) b.classList.add("correta");
                    });
                    pontuacao++;
                    user.totalAcertos++;
                    user.totalPerguntas++;
                    user.streak++;
                    if (user.streak > user.maxStreak) user.maxStreak = user.streak;
                    ganharXp(XP_BASE);
                    ganharMoedas(MOEDAS_ACERTO);
                    res.innerText = `💜 ROXO! Questão destruída! Correto: ${item4.opcoes[corretaIdx]}`;
                    res.style.color = "#9b59b6";
                    document.getElementById("btnProximo").style.display = "inline-block";
                    return;
                }
                explTempo++;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const r = 10 + explTempo * 12;
                const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                grad.addColorStop(0, 'rgba(155,89,182,0.8)');
                grad.addColorStop(0.3, 'rgba(142,68,173,0.5)');
                grad.addColorStop(0.6, 'rgba(231,76,60,0.3)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // inner glow
                const grad2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.3);
                grad2.addColorStop(0, 'rgba(255,255,255,0.9)');
                grad2.addColorStop(1, 'rgba(155,89,182,0)');
                ctx.fillStyle = grad2;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                // particles
                for (let i = 0; i < 5; i++) {
                    const a = Math.random() * Math.PI * 2;
                    const dist = Math.random() * r * 0.8;
                    ctx.fillStyle = ['#9b59b6','#8e44ad','#e74c3c','#fff'][Math.floor(Math.random()*4)];
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, Math.random() * 4 + 2, 0, Math.PI*2);
                    ctx.fill();
                }
                requestAnimationFrame(animarExplosao);
            }
            animarExplosao();
            res.innerText = `💜 ${poder.nome}!! Carregando...`;
            res.style.color = "#9b59b6";
            break;

        case 'curar_vida':
            if (vidas < 3) {
                vidas++;
                atualizarVidas();
                res.innerText = `🌊 ${poder.nome}! +1 vida recuperada!`;
            } else {
                res.innerText = `🌊 ${poder.nome}! Vidas já estão cheias!`;
            }
            res.style.color = "#4ade80";
            break;

        case 'curar_tudo':
            vidas = 3;
            atualizarVidas();
            res.innerText = `🌙 ${poder.nome}! Todas as vidas restauradas!`;
            res.style.color = "#4ade80";
            break;

        case 'moedas_dobradas':
            poderEfeito = 'moedas_dobradas';
            res.innerText = `🗡️ ${poder.nome}! Moedas dobradas no próximo acerto!`;
            res.style.color = "#ffd200";
            break;

        case 'xp_triplo':
            poderEfeito = 'xp_triplo';
            res.innerText = `💥 ${poder.nome}! XP triplicado no próximo acerto!`;
            res.style.color = "#f7971e";
            break;
    }
    atualizarHUD();
    atualizarCharWidget();
}

// ===== ANIMAÇÃO 100% =====
function iniciarAnimacaoPerfeito() {
    const canvas = document.getElementById('animacaoCanvas');
    canvas.classList.add('ativo');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const fireworks = [];
    const confettis = [];
    let tempo = 0;
    let animacaoAtiva = true;

    // Firework colors
    const cores = ['#ff0', '#f0f', '#0ff', '#f00', '#0f0', '#00f', '#ffd700', '#ff69b4', '#ff4500', '#7fff00'];

    class Particle {
        constructor(x, y, cor) {
            this.x = x; this.y = y;
            const a = Math.random() * Math.PI * 2;
            const v = Math.random() * 6 + 2;
            this.vx = Math.cos(a) * v;
            this.vy = Math.sin(a) * v;
            this.cor = cor;
            this.vida = 1;
            this.dec = Math.random() * 0.02 + 0.008;
            this.r = Math.random() * 3 + 1;
            this.gravity = 0.05;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.vx *= 0.98;
            this.vy *= 0.98;
            this.vida -= this.dec;
        }
        draw(ctx) {
            ctx.globalAlpha = Math.max(0, this.vida);
            ctx.fillStyle = this.cor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
            this.y = canvas.height + 10;
            const alvoY = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
            this.vy = -Math.abs((this.y - alvoY) / 60);
            this.ativo = true;
            this.cor = cores[Math.floor(Math.random() * cores.length)];
            this.rastro = [];
        }
        update() {
            this.rastro.push({ x: this.x, y: this.y });
            if (this.rastro.length > 8) this.rastro.shift();
            this.y += this.vy;
            this.vy *= 0.99;
            if (this.vy > -0.5) {
                this.ativo = false;
                explodir(this.x, this.y, this.cor);
            }
        }
        draw(ctx) {
            for (let i = 0; i < this.rastro.length; i++) {
                const a = i / this.rastro.length;
                ctx.globalAlpha = a * 0.5;
                ctx.fillStyle = this.cor;
                ctx.beginPath();
                ctx.arc(this.rastro[i].x, this.rastro[i].y, 2 * a, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function explodir(x, y, cor) {
        const qtd = Math.floor(Math.random() * 30) + 25;
        for (let i = 0; i < qtd; i++) {
            particles.push(new Particle(x, y, cor));
        }
        // secondary explosion
        setTimeout(() => {
            if (!animacaoAtiva) return;
            for (let i = 0; i < 15; i++) {
                const p = new Particle(x, y, cores[Math.floor(Math.random() * cores.length)]);
                const a = Math.random() * Math.PI * 2;
                const v = Math.random() * 3 + 1;
                p.vx = Math.cos(a) * v;
                p.vy = Math.sin(a) * v;
                p.r = Math.random() * 2 + 0.5;
                particles.push(p);
            }
        }, 150);
    }

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.w = Math.random() * 8 + 4;
            this.h = Math.random() * 6 + 3;
            this.vy = Math.random() * 2 + 1.5;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.cor = cores[Math.floor(Math.random() * cores.length)];
            this.rot = Math.random() * Math.PI * 2;
            this.rotV = (Math.random() - 0.5) * 0.1;
        }
        update() {
            this.y += this.vy;
            this.x += this.vx;
            this.rot += this.rotV;
            this.vy += 0.01;
        }
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rot);
            ctx.fillStyle = this.cor;
            ctx.globalAlpha = 0.85;
            ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            ctx.globalAlpha = 1;
            ctx.restore();
        }
    }

    // Spawn confetti
    for (let i = 0; i < 60; i++) {
        const c = new Confetti();
        c.y = Math.random() * canvas.height;
        c.vy = Math.random() * 1.5 + 0.5;
        confettis.push(c);
    }

    // Initial fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            if (animacaoAtiva) fireworks.push(new Firework());
        }, i * 300);
    }

    function animar() {
        if (!animacaoAtiva) return;
        tempo++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Screen flash effect on first frame
        if (tempo < 15) {
            ctx.fillStyle = `rgba(255,255,255,${0.15 * (1 - tempo / 15)})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Spawn new fireworks
        if (tempo % 20 === 0 && tempo < 180) {
            fireworks.push(new Firework());
        }
        if (tempo % 35 === 0 && tempo < 240) {
            for (let i = 0; i < 2; i++) fireworks.push(new Firework());
        }

        // Spawn confetti waves
        if (tempo % 15 === 0 && tempo < 300) {
            for (let i = 0; i < 5; i++) confettis.push(new Confetti());
        }

        fireworks.forEach(fw => { fw.update(); fw.draw(ctx); });
        fireworks = fireworks.filter(fw => fw.ativo || false);

        particles.forEach(p => { p.update(); p.draw(ctx); });
        particles = particles.filter(p => p.vida > 0);

        confettis.forEach(c => { c.update(); c.draw(ctx); });
        confettis = confettis.filter(c => c.y < canvas.height + 20);

        // Text
        const pctTempo = Math.min(tempo / 60, 1);
        const escala = 0.5 + 0.5 * Math.sin(tempo * 0.05) * 0.1;
        const textY = canvas.height / 2 - 40 + (1 - pctTempo) * 30;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Glow
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 30 + Math.sin(tempo * 0.1) * 10;

        const fontSize = 42 + Math.sin(tempo * 0.08) * 3;
        ctx.font = `900 ${fontSize}px 'Segoe UI', sans-serif`;

        // Gradient text
        const grad = ctx.createLinearGradient(canvas.width / 2 - 200, textY - 30, canvas.width / 2 + 200, textY + 30);
        grad.addColorStop(0, '#ffd700');
        grad.addColorStop(0.5, '#fff');
        grad.addColorStop(1, '#ffd700');
        ctx.fillStyle = grad;

        ctx.fillText('⭐ PERFEITO! ⭐', canvas.width / 2, textY);

        // Subtitle
        ctx.shadowBlur = 15;
        ctx.font = `700 22px 'Segoe UI', sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillText('100% - Recompensa Dobrada!', canvas.width / 2, textY + 55);

        ctx.restore();

        requestAnimationFrame(animar);
    }

    animar();

    setTimeout(() => {
        animacaoAtiva = false;
        canvas.classList.remove('ativo');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 6000);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== NAVEGAÇÃO E UI =====
function mostrarAba(aba) {
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('ativa'));
    document.querySelectorAll('.view').forEach(el => el.classList.remove('ativa'));
    document.getElementById(`tab${aba}`).classList.add('ativa');
    document.getElementById(`view${aba}`).classList.add('ativa');
    if (aba === 'Loja') renderizarLoja();
    if (aba === 'Inventario') renderizarInventario();
    if (aba === 'Perfil') renderizarPerfil();
}

function atualizarHUD() {
    const pct = user.nivel >= NIVEL_MAX ? 100 : Math.round((user.xp / user.xpProximoNivel) * 100);
    document.getElementById('hudNivel').innerText = `LV ${user.nivel}`;
    document.getElementById('hudBarra').style.width = `${pct}%`;
    document.getElementById('hudXpTexto').innerText = user.nivel >= NIVEL_MAX ? 'MAX' : `${user.xp}/${user.xpProximoNivel} XP`;
    document.getElementById('hudMoedas').innerText = `🪙 ${user.moedas}`;

    const rankAtivo = user.equipado.rank ? lojaRanks.find(r => r.id === user.equipado.rank) : null;
    const rankMostra = document.getElementById('hudRank');
    if (rankAtivo) {
        rankMostra.innerText = `${rankAtivo.icone} ${rankAtivo.nome} ⚡${rankAtivo.multiplicadorXP}x`;
        rankMostra.style.color = rankAtivo.cor;
    } else {
        rankMostra.innerText = '';
    }

    const streakEl = document.getElementById('hudStreak');
    if (user.streak > 0) {
        streakEl.innerText = `🔥 ${user.streak}`;
        streakEl.style.display = 'inline';
    } else {
        streakEl.style.display = 'none';
    }

    const boostEl = document.getElementById('hudBoost');
    if (user.boostAtivo) {
        boostEl.innerText = `⚡ ${user.boostAtivo.multiplicador}x (${user.boostAtivo.restantes})`;
        boostEl.style.display = 'inline';
    } else {
        boostEl.style.display = 'none';
    }

    // Character widget
    atualizarCharWidget();
}

function atualizarCharWidget() {
    const widget = document.getElementById('charWidget');
    const personId = user.equipado.personagem;
    if (!personId || !quizAtivo) {
        widget.style.display = 'none';
        return;
    }
    const ch = pixelCharacters[personId];
    const poder = poderesDisponiveis[personId];
    if (!ch) { widget.style.display = 'none'; return; }

    widget.style.display = 'flex';
    const canvas = document.getElementById('charWidgetPixel');
    renderPixel(canvas, ch, 4);

    document.getElementById('charWidgetNome').innerText = ch.nome.split(' ')[0];

    const btn = document.getElementById('charWidgetPoder');
    if (poder && !poderUsado && !perguntaRespondida) {
        btn.style.display = 'block';
        btn.innerText = `${poder.icone} ${poder.nome}`;
        btn.disabled = false;
    } else {
        btn.style.display = 'block';
        btn.innerText = poderUsado ? '✅ Usado' : '⏳ Espere';
        btn.disabled = true;
    }
}

// ===== LOJA (render) =====
function renderizarLoja() {
    document.getElementById('lojaSaldo').innerText = user.moedas;
    const container = document.getElementById('lojaConteudo');
    let html = '<div class="loja-categorias">';
    lojaBoosts.forEach(item => html += cardLoja(item, 'boost'));
    html += '</div><h3 class="secao-titulo">🎭 Personagens</h3><div class="loja-categorias">';
    Object.entries(pixelCharacters).forEach(([id, ch]) => {
        const comprado = user.inventario.personagens.includes(id);
        const poder = poderesDisponiveis[id];
        html += `
            <div class="card-loja">
                <div class="pixel-container"><canvas id="pixel-${id}" class="pixel-art"></canvas></div>
                <div class="card-info">
                    <strong>${ch.nome}</strong>
                    <small>${ch.anime}</small>
                    ${poder ? `<small class="poder-info">${poder.icone} ${poder.nome}</small>` : ''}
                </div>
                ${comprado ? '<span class="tag-comprado">✔️ Comprado</span>' :
                    `<button onclick="comprarItem('personagem','${id}')" class="btn-comprar" ${user.moedas < ch.preco ? 'disabled' : ''}>🪙 ${ch.preco}</button>`}
                ${comprado && user.equipado.personagem !== id ?
                    `<button onclick="equiparItem('personagem','${id}')" class="btn-equipar">Equipar</button>` : ''}
                ${user.equipado.personagem === id ? '<span class="tag-equipado">✅ Equipado</span>' : ''}
            </div>`;
    });
    html += '</div><h3 class="secao-titulo">🏆 Ranks</h3><div class="loja-categorias">';
    lojaRanks.forEach(item => html += cardLoja(item, 'rank'));
    html += '</div><h3 class="secao-titulo">📝 Posts</h3><div class="loja-categorias">';
    lojaPosts.forEach(item => html += cardLoja(item, 'post'));
    html += '</div>';
    container.innerHTML = html;
    setTimeout(() => {
        Object.keys(pixelCharacters).forEach(id => {
            const c = document.getElementById(`pixel-${id}`);
            if (c) renderPixel(c, pixelCharacters[id], 4);
        });
    }, 50);
}

function cardLoja(item, tipo) {
    const comprado = user.inventario[tipo + 's']?.includes(item.id);
    const cor = item.cor || '#fff';
    if (tipo === 'boost') {
        const ativo = user.boostAtivo && user.boostAtivo.id === item.id;
        return `
            <div class="card-loja" style="border-color:${cor}">
                <div class="card-info"><strong>${item.nome}</strong><small>${item.desc}</small></div>
                ${ativo ? '<span class="tag-ativo">⚡ Ativo</span>' :
                    comprado ? '<span class="tag-comprado">✔️ Comprado</span>' :
                    `<button onclick="comprarItem('boost','${item.id}')" class="btn-comprar" ${user.moedas < item.preco ? 'disabled' : ''}>🪙 ${item.preco}</button>`}
            </div>`;
    }
    const equipado = user.equipado[tipo] === item.id;
    if (tipo === 'rank') {
        return `
            <div class="card-loja" style="border-color:${cor}">
                <div class="card-info">
                    <strong>${item.icone} ${item.nome}</strong>
                    <small>${item.desc}</small>
                    <span class="rank-mult-info">⚡ ${item.multiplicadorXP}x XP</span>
                </div>
                ${equipado ? '<span class="tag-equipado">✅ Equipado</span>' :
                    comprado ? `<button onclick="equiparItem('${tipo}','${item.id}')" class="btn-equipar">Equipar</button>` :
                    `<button onclick="comprarItem('${tipo}','${item.id}')" class="btn-comprar" ${user.moedas < item.preco ? 'disabled' : ''}>🪙 ${item.preco}</button>`}
            </div>`;
    }
    return `
        <div class="card-loja" style="border-color:${cor}">
            <div class="card-info"><strong>${item.nome}</strong><small>${item.desc}</small></div>
            ${equipado ? '<span class="tag-equipado">✅ Equipado</span>' :
                comprado ? `<button onclick="equiparItem('${tipo}','${item.id}')" class="btn-equipar">Equipar</button>` :
                `<button onclick="comprarItem('${tipo}','${item.id}')" class="btn-comprar" ${user.moedas < item.preco ? 'disabled' : ''}>🪙 ${item.preco}</button>`}
        </div>`;
}

function comprarItem(tipo, id) {
    const lista = tipo === 'personagem'
        ? Object.entries(pixelCharacters).map(([k, v]) => ({ id: k, ...v }))
        : tipo === 'boost' ? lojaBoosts : tipo === 'rank' ? lojaRanks : lojaPosts;
    const item = lista.find(i => i.id === id);
    if (!item || user.moedas < item.preco) return;
    if (tipo === 'boost') {
        if (user.boostAtivo) return;
        user.boostAtivo = { id: item.id, multiplicador: item.multiplicador, restantes: item.restantes };
    } else {
        const plural = tipo === 'personagem' ? 'personagens' : tipo + 's';
        if (!user.inventario[plural]) user.inventario[plural] = [];
        if (user.inventario[plural].includes(id)) return;
        user.inventario[plural].push(id);
    }
    user.moedas -= item.preco;
    salvarUser();
    atualizarHUD();
    renderizarLoja();
}

function equiparItem(tipo, id) {
    if (tipo === 'personagem' && user.inventario.personagens.includes(id)) user.equipado.personagem = id;
    else if (tipo === 'rank' && user.inventario.ranks.includes(id)) user.equipado.rank = id;
    else if (tipo === 'post' && user.inventario.posts.includes(id)) user.equipado.post = id;
    else return;
    salvarUser();
    atualizarHUD();
    renderizarLoja();
}

// ===== INVENTÁRIO =====
let invAbaAtiva = 'personagens';

function renderizarInventario() {
    const c = document.getElementById('invConteudo');
    const p = user.inventario.personagens;
    const r = user.inventario.ranks;
    const ps = user.inventario.posts;
    const temPersonagens = p.length > 0;
    const temRanks = r.length > 0;
    const temPosts = ps.length > 0;

    let html = '<div class="inv-tabs">';
    html += `<button class="inv-tab ${invAbaAtiva === 'personagens' ? 'ativa' : ''}" onclick="mudarInvAba('personagens')">🎭 Personagens (${p.length})</button>`;
    html += `<button class="inv-tab ${invAbaAtiva === 'ranks' ? 'ativa' : ''}" onclick="mudarInvAba('ranks')">🏆 Ranks (${r.length})</button>`;
    html += `<button class="inv-tab ${invAbaAtiva === 'posts' ? 'ativa' : ''}" onclick="mudarInvAba('posts')">📝 Posts (${ps.length})</button>`;
    html += '</div>';

    if (!temPersonagens && !temRanks && !temPosts) {
        html += '<p class="vazio">Seu inventário está vazio. Compre itens na loja!</p>';
        c.innerHTML = html;
        return;
    }

    if (invAbaAtiva === 'personagens') {
        if (temPersonagens) {
            html += '<div class="inv-grid">';
            p.forEach(id => {
                const ch = pixelCharacters[id];
                if (!ch) return;
                const eq = user.equipado.personagem === id;
                const pod = poderesDisponiveis[id];
                html += `<div class="card-inv ${eq ? 'equipado' : ''}">
                    <div class="pixel-container"><canvas id="invpixel-${id}" class="pixel-art pixel-sm"></canvas></div>
                    <div class="card-info">
                        <strong>${ch.nome}</strong>
                        <small>${ch.anime}</small>
                        ${pod ? `<small class="poder-info">${pod.icone} ${pod.nome}</small>` : ''}
                    </div>
                    ${eq ? '<span class="tag-equipado">✅ Equipado</span>' : `<button onclick="equiparItem('personagem','${id}');renderizarInventario()" class="btn-equipar">Equipar</button>`}
                </div>`;
            });
            html += '</div>';
        } else {
            html += '<p class="vazio">Nenhum personagem ainda. Compre na loja!</p>';
        }
    } else if (invAbaAtiva === 'ranks') {
        if (temRanks) {
            html += '<div class="inv-grid">';
            r.forEach(id => {
                const rank = lojaRanks.find(x => x.id === id);
                if (!rank) return;
                const eq = user.equipado.rank === id;
                html += `<div class="card-inv ${eq ? 'equipado' : ''}" style="border-color:${rank.cor}">
                    <div class="card-info">
                        <strong>${rank.icone} ${rank.nome}</strong>
                        <small class="rank-mult-info">⚡${rank.multiplicadorXP}x XP</small>
                    </div>
                    ${eq ? '<span class="tag-equipado">✅ Equipado</span>' : `<button onclick="equiparItem('rank','${id}');renderizarInventario()" class="btn-equipar">Equipar</button>`}
                </div>`;
            });
            html += '</div>';
        } else {
            html += '<p class="vazio">Nenhum rank ainda. Compre na loja!</p>';
        }
    } else if (invAbaAtiva === 'posts') {
        if (temPosts) {
            html += '<div class="inv-grid">';
            ps.forEach(id => {
                const post = lojaPosts.find(x => x.id === id);
                if (!post) return;
                const eq = user.equipado.post === id;
                html += `<div class="card-inv post-card ${eq ? 'equipado' : ''}">
                    <div class="card-info"><strong>${post.nome}</strong><small>${post.conteudo}</small></div>
                    ${eq ? '<span class="tag-equipado">✅ Ativo</span>' : `<button onclick="equiparItem('post','${id}');renderizarInventario()" class="btn-equipar">Ativar</button>`}
                </div>`;
            });
            html += '</div>';
        } else {
            html += '<p class="vazio">Nenhum post ainda. Compre na loja!</p>';
        }
    }

    c.innerHTML = html;
    setTimeout(() => {
        if (invAbaAtiva === 'personagens') {
            p.forEach(id => {
                const el = document.getElementById(`invpixel-${id}`);
                if (el) renderPixel(el, pixelCharacters[id], 3);
            });
        }
    }, 50);
}

function mudarInvAba(aba) {
    invAbaAtiva = aba;
    renderizarInventario();
}

// ===== PERFIL =====
function renderizarPerfil() {
    const pct = user.totalPerguntas > 0 ? Math.round((user.totalAcertos / user.totalPerguntas) * 100) : 0;
    const personEq = user.equipado.personagem ? pixelCharacters[user.equipado.personagem] : null;
    const rankEq = user.equipado.rank ? lojaRanks.find(r => r.id === user.equipado.rank) : null;
    const postEq = user.equipado.post ? lojaPosts.find(p => p.id === user.equipado.post) : null;
    let html = `
        <div class="perfil-header">
            ${personEq ? `<div class="pixel-container perfil-pixel"><canvas id="perfpixel-${user.equipado.personagem}" class="pixel-art pixel-lg"></canvas></div>` : '<div class="perfil-avatar-placeholder">🎮</div>'}
            <div class="perfil-info">
                <h2>Nível ${user.nivel}</h2>
                <div class="xp-bar-grande"><div class="xp-bar-grande-preenchimento" style="width:${user.nivel >= NIVEL_MAX ? 100 : Math.round((user.xp / user.xpProximoNivel) * 100)}%"></div></div>
                <span class="xp-texto">${user.nivel >= NIVEL_MAX ? 'MAX LEVEL' : `${user.xp} / ${user.xpProximoNivel} XP`}</span>
                ${rankEq ? `<p class="rank-exibido" style="color:${rankEq.cor}">${rankEq.icone} ${rankEq.nome} <span class="rank-mult-info">⚡${rankEq.multiplicadorXP}x XP</span></p>` : ''}
                ${postEq ? `<p class="post-exibido">${postEq.conteudo}</p>` : ''}
            </div>
        </div>
        <div class="perfil-stats">
            <div class="stat-card"><span class="stat-num">${user.totalPerguntas}</span><span>Perguntas</span></div>
            <div class="stat-card"><span class="stat-num">${user.totalAcertos}</span><span>Acertos</span></div>
            <div class="stat-card"><span class="stat-num">${pct}%</span><span>Aproveitamento</span></div>
            <div class="stat-card"><span class="stat-num">${user.maxStreak}</span><span>Max Streak</span></div>
            <div class="stat-card"><span class="stat-num">${user.moedas}</span><span>🪙 Moedas</span></div>
            <div class="stat-card"><span class="stat-num">${user.inventario.personagens.length}</span><span>🎭 Personagens</span></div>
        </div>`;
    document.getElementById('perfilConteudo').innerHTML = html;
    if (personEq) {
        setTimeout(() => {
            const el = document.getElementById(`perfpixel-${user.equipado.personagem}`);
            if (el) renderPixel(el, personEq, 6);
        }, 50);
    }
}

// ===== NOTIFICAÇÃO =====
function notificar(texto, cor) {
    const el = document.createElement('div');
    el.className = 'notificacao';
    el.innerText = texto;
    el.style.borderLeftColor = cor || '#4ade80';
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('show'), 10);
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2500);
}

// ===== INICIALIZAÇÃO =====
atualizarHUD();
