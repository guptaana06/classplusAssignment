import React from "react";
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: [],
      showStudents: false
    };
  }
  componentDidMount() {
    fetch("https://student-management-api-1u3cd4j7s.now.sh/students")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  dynamicsort = (property, order) => {
    var sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return function (a, b) {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    }
  }
  showNames = () =>{
    this.setState({
      showStudents : true
    })
  }
  render() {
    console.log(this.state.data.sort(this.dynamicsort("class", "asc")))
    const { error, isLoaded, data, showStudents } = this.state;
    const classArray = [...new Set(data.map(item => item.class))]
    // data.map(item => item.class)
    // .filter((value, index, self) => self.indexOf(value) === index)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {classArray.map(item => (
            <li key={item.id}>
              {"Class "}{item}
              <ul>
                {[...new Set((data.filter(item1 => item1.class === item))
                  .map(itemSection => itemSection.section))].sort()
                  .map(sectionItems =>
                    <li
                      key={sectionItems.id}
                      onclick={this.showNames}
                    >
                      {"Section "}{sectionItems}

                      {showStudents ? data.filter(itemNames => item === itemNames.class && itemNames.section === sectionItems)
                        .map(names =>
                          <span>{names.name}</span>
                        )
                      :''
                      }

                    </li>
                  )
                }</ul>
            </li>
          ))}
        </ul>
      );
    }

  }
}

export default App;

