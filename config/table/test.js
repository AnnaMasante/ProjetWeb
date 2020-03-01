

const Question = sequelize.define(
    'Question', {
        idQuestion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

Question.sync()
    .then(() => console.log('Table de Question créée'))
    .catch(err => console.log('Oups ça ne marche pas'));
    
const Colocation = sequelize.define(
    'Colocation',{
        idColoc:{
            idColoc:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

Colocation.sync()
    .then(() => console.log('Table de Question créée'))
    .catch(err => console.log('Oups ça ne marche pas'));

const Resultat = sequelize.define(
    'Resultat',{
        idResultat:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

Resultat.sync()
    .then(() => console.log('Table de Colocation créée'))
    .catch(err => console.log('Oups ça ne marche pas'));