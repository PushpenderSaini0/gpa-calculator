const {
  Container,
  Typography,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  TextField,
  Button
} = MaterialUI;

const { useState } = React;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const ResultBox = (prop) => {
  return (
    <div style={{ marginTop: 25 }}>
      <Typography
        variant="h3"
        component="h2"
        align="center">
        Your GPA is : {prop.gpa}
      </Typography>
    </div>
  );
}

const CourceTableRow = (prop) => {
  const row = prop.row;
  return (
    <TableRow>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="center">{row.credit}</TableCell>
      <TableCell align="center">{row.grade}</TableCell>
    </TableRow>
  );
}

const CourceTable = (prop) => {
  const data = prop.data;
  return (
    <div style={{ marginTop: 25 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Cource Name</TableCell>
              <TableCell align="center">Credit</TableCell>
              <TableCell align="center">Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.length ?
                data.map(row => (
                  <CourceTableRow key={row.name} row={row} />
                ))
                : <CourceTableRow row={{ name: "Add Some Cource" }} />
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}


const AddDataToTable = (prop) => {
  const classes = useStyles();
  const [name, setName] = useState("name");
  const [credit, setCredit] = useState("4");
  const [grade, setGrade] = useState("10");

  const addDataHandler = () => {
    prop.addDataHandler({
      name, credit, grade
    })
  }
  const resetTableHandler = prop.resetTableHandler;

  const nameHandler = (e) => {
    setName(e.target.value);
  }
  const creditHandler = (e) => {
    setCredit(e.target.value);
  }
  const gradeHandler = (e) => {
    setGrade(e.target.value);
  }

  return (
    <div style={{ marginTop: 25 }}>
      <FormControl className={classes.formControl} >
        <TextField
          id="cource-name"
          label="Name"
          value={name}
          onChange={nameHandler}
        />
      </FormControl>
      <FormControl className={classes.formControl} >
        <InputLabel id="cource-credit">Credit</InputLabel>
        <Select
          labelId="cource-credit"
          id="cource-credit-select"
          value={credit}
          onChange={creditHandler}
        >
          <MenuItem value={10}>1.0</MenuItem>
          <MenuItem value={1.5}>1.5</MenuItem>
          <MenuItem value={2}>2.0</MenuItem>
          <MenuItem value={2.5}>2.5</MenuItem>
          <MenuItem value={3}>3.0</MenuItem>
          <MenuItem value={3.5}>3.5</MenuItem>
          <MenuItem value={4}>4.0</MenuItem>
          <MenuItem value={4.5}>4.5</MenuItem>
          <MenuItem value={5}>5.0</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} >
        <InputLabel id="cource-grade">Grade</InputLabel>
        <Select
          labelId="cource-grade"
          id="cource-grade-select"
          value={grade}
          onChange={gradeHandler}
        >
          <MenuItem value={10}>A+</MenuItem>
          <MenuItem value={9}>A</MenuItem>
          <MenuItem value={8}>B+</MenuItem>
          <MenuItem value={7}>B</MenuItem>
          <MenuItem value={6}>C+</MenuItem>
          <MenuItem value={5}>C</MenuItem>
          <MenuItem value={4}>D</MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginTop: 25 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={addDataHandler}
        >
          Add Data
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={resetTableHandler}
        >
          Reset Table
        </Button>
      </div>
    </div>
  );
}


const App = () => {
  const [data, setData] = useState([]);
  const [GPA, setGPA] = useState("0.0");

  const calcGPA = (courceData) => {
    let totalCredit = 0;
    let ggpa = 0;
    courceData.forEach(cource => {
      ggpa += (cource.grade * cource.credit);
      totalCredit =+ cource.credit;
    });
    setGPA((ggpa/totalCredit).toFixed(2));
  }

  const addData = (cource) => {
    setData((prev) => {
      prev.push(cource);
      calcGPA(prev);
      return [...prev];
    });
  }
  const resetTable = () => {
    setData([]);
    setGPA("0.0");
  }
  console.log(data);
  return (
    <Container maxWidth="sm">
      <div style={{ marginTop: 50 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center">
          GPA Calculator
        </Typography>
      </div>
      <CourceTable data={data} />
      <AddDataToTable
        addDataHandler={addData}
        resetTableHandler={resetTable}
      />
      <ResultBox gpa={GPA} />
    </Container>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
