# exportExcel

Component export excel - Material UI

# Foi utilizado a biblioteca xlsx.

npm i xlsx

# Componente utilizado para exportar Excel, CSV, imprimir de maneira grátis

Para alterar o nome do arquivo tanto em excel como CSV.

# Excel
  Altere nome-arquivo para nome que deseja.
<pre>
 XLSX.utils.book_append_sheet(workbook, worksheet, "nome-arquivo");
 XLSX.writeFile(workbook, "nome-arquivo.xlsx", { compression: true });
</pre>

# CSV
  Altere nome-arquivo para nome que deseja.
<pre>
link.download = "nome-arquivo.csv";
</pre>

# Como adicionar o button no DataGrid ?

Adicione o components no DataGrid

<pre>
components={{
            Toolbar: ExemploFiltro,
          }}
</pre>

Depoois a function onde vai ficar o Button

<pre>
function ExemploFiltro() {
    return (
      <>
         <GridToolbarContainer>
           <ExportButton/>
         </GridToolbarContainer>
      </>
    );
  }
</pre>

