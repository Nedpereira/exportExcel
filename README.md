# Export Excel - Material ui

Component export excel - Material UI

# Foi utilizado a biblioteca xlsx.

npm i xlsx

# Componente utilizado para exportar Excel, CSV, imprimir de maneira grátis

Para alterar o nome do arquivo tanto em excel como CSV.

# Excel
  Altere nome-arquivo para nome que deseja.
  
```
 XLSX.utils.book_append_sheet(workbook, worksheet, "nome-arquivo");
 XLSX.writeFile(workbook, "nome-arquivo.xlsx", { compression: true });
```

# CSV
  Altere nome-arquivo para nome que deseja.
  
```
link.download = "nome-arquivo.csv";
```

# Como adicionar o button no DataGrid ?

Adicione o components no DataGrid

```
components={{
            Toolbar: ExemploFiltro,
          }}
```

Depois a function onde vai ficar o Button

```
function ExemploFiltro() {
    return (
         <GridToolbarContainer>
           <ExportButton/>
         </GridToolbarContainer>
    );
  }
```

