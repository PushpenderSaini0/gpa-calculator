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
  Button,
  IconButton
} = MaterialUI;

const { useState, useEffect } = React;

const GRADES = ['F','F','F','F','D','C','C+','B','B+','A','A+'];

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
        variant="h4"
        component="h4"
        align="center">
        Your GPA is : {prop.gpa}
      </Typography>
    </div>
  );
}

const CourceTableRow = (prop) => {
  const row = prop.row;
  const clickHandler = () => {
    prop.removeCource(prop.row.id);
  }
  return (
    <TableRow>
      <TableCell align="left">{row.name}</TableCell>
      <TableCell align="center">{row.credit}</TableCell>
      <TableCell align="center">{GRADES[row.grade]}</TableCell>
      <TableCell align="right">
        {prop.row.credit ? <IconButton
          aria-label="delete"
          onClick={clickHandler}
        >
          <span className="material-icons">delete</span>
        </IconButton> : " "}
      </TableCell>
    </TableRow >
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
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.length ?
                data.map(row => (
                  <CourceTableRow removeCource={prop.removeCource} key={row.id} row={row} />
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
  const [credit, setCredit] = useState("0");
  const [grade, setGrade] = useState("0");
  const id = name + new Date().getTime();
  const addDataHandler = () => {
    prop.addDataHandler({
      id, name, credit, grade
    });
    setName("");
    setCredit("0");
    setGrade("0");
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
          <MenuItem value={0}>Select</MenuItem>
          <MenuItem value={1}>1.0</MenuItem>
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
          <MenuItem value={0}>Select</MenuItem>
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
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("userCourceData") || "[]"));
  }, []);
  const removeCource = (courceId) => {
    setData((prev) => {
      const res = prev.filter(obj => {
        if (obj.id != courceId) {
          return obj;
        }
      });
      localStorage.setItem("userCourceData", JSON.stringify(res));
      return res;
    });
  }

  const calcGPA = (courceData) => {
    let totalCredit = 0;
    let ggpa = 0;
    courceData.forEach(cource => {
      ggpa += (cource.grade * cource.credit);
      totalCredit = + cource.credit;
    });
    setGPA((ggpa / totalCredit).toFixed(2));
  }

  const addData = (cource) => {
    setData((prev) => {
      prev.push(cource);
      calcGPA(prev);
      localStorage.setItem("userCourceData", JSON.stringify(prev));
      return [...prev];
    });
  }
  const resetTable = () => {
    setData([]);
    localStorage.setItem("userCourceData", JSON.stringify([]));
    setGPA("0.0");
  }
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
      <CourceTable data={data} removeCource={removeCource} />
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
