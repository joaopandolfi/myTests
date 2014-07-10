
// Carrega os dados ou cria tabela
function loaded()
{
    db.transaction(function(tx) {
        tx.executeSql("SELECT COUNT(*) FROM avaliacao", [], function(result) {
            loadNotes();
        }, function(tx, error) {
            tx.executeSql("CREATE TABLE avaliacao (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idMateria INTEGER, nome TEXT, valor REAL, peso REAL, corrente REAL, falta REAL)", [], function(result) { 
                loadNotes(); 
            });
        });
    });
}

//carrega notas
function loadNotes()
{
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM avaliacao", [], function(tx, result) {
            //percorre o resultado
			for (var i = 0; i < result.rows.length; ++i) {
                var row = result.rows.item(i);
				novoCampo = "<li id='"+ row['id'] +"'><a href='#'> "+ row['nome'] + " ["+ row['valor'] + "]("+ row['peso']+") : "+row['corrente']+" ("+row['falta']+")</a></li>";
				$(novoCampo).insertBefore("li.fim:first");
				$("#matmenu").listview("refresh");
			}

            /*if (!result.rows.length)
                newNote();*/
        }, function(tx, error) {
            alert('Falha ao acessar o BD - ' + error.message);
            return;
        });
    });
}

function Insert(table,data)
{
 db.transaction(function (tx) 
  {  
    tx.executeSql("INSERT INTO "+table+" (idMateria, nome, valor, peso, corrente, falta) VALUES ( ?, ?, ?, ?, ?)", [0, "Nome da Avaliacão", 0, 1, 0, 0]);
  }); 
}

// deleta
function deleteNote()
{
  db.transaction(function(tx)
  {
    tx.executeSql("DELETE FROM avaliacao WHERE id = ?", [note.id]);
   });
}

function delTable(){
  db.transaction(function(tx)
  {
    tx.executeSql("DROP TABLE 'avaliacao'");
   });
}

//pega parametro GET
function _GET(name)
{
  var url   = window.location.search.replace("?", "");
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}
