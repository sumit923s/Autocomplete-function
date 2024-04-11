'use client';
import React, { useState } from "react";

const data: string[] = [
    "Aarav", "Aaradhya", "Aayush", "Advait", "Aditi", "Aditya", "Akhil", "Akash", "Amit", "Amrita", 
    "Ananya", "Aniket", "Anita", "Anjali", "Ankit", "Ansh", "Anshika", "Arjun", "Arpita", "Aryan", 
    "Ashish", "Ayush", "Bhavya", "Bhupinder", "Chaitanya", "Daksh", "Darsh", "Deepak", "Dev", 
    "Devansh", "Dhruv", "Divya", "Gaurav", "Gopal", "Harsh", "Himanshu", "Ishaan", "Jai", "Kabir", 
    "Kalyani", "Karan", "Kavya", "Kriti", "Krish", "Mahesh", "Manish", "Maya", "Meera", "Mohan", 
    "Mohini", "Neha", "Nikhil", "Nishant", "Nitin", "Nivedita", "Pooja", "Prachi", "Pranav", 
    "Prashant", "Priya", "Rahul", "Raj", "Rajesh", "Rakesh", "Rashi", "Rhea", "Rishi", "Rohan", 
    "Ruchi", "Sahil", "Samir", "Sanjay", "Santosh", "Sarika", "Sarthak", "Shalini", "Shreya", 
    "Shubham", "Siddharth", "Sneha", "Soham", "Sonali", "Sonia", "Suman", "Suresh", "Swati", 
    "Tanvi", "Tara", "Udit", "Uma", "Varun", "Vidya", "Vikas", "Vishal", "Yash", "Yogesh", "Zoya"
];

function appLogic(data: string[], userinput: string): string[] {
  const output: string[] = [];

  // Priority 1: Start match
  for (let i = 0; i < data.length; i++) {
    let str: string = data[i];
    if (str.toLowerCase().startsWith(userinput.toLowerCase())) {
      output.push(str);
    }
  }

  // Priority 2: Middle match
  if (output.length < 10) {
    for (let i = 0; i < data.length; i++) {
      let str: string = data[i];
      if (
        output.length < 10 &&
        str.toLowerCase().includes(userinput.toLowerCase()) &&
        !output.includes(str)
      ) {
        output.push(str);
      }
    }
  }

  // Priority 3: End match
  if (output.length < 10) {
    for (let i = 0; i < data.length; i++) {
      let str: string = data[i];
      if (
        output.length < 10 &&
        str.toLowerCase().endsWith(userinput.toLowerCase()) &&
        !output.includes(str)
      ) {
        output.push(str);
      }
    }
  }

  // Priority 4: Order match
  // Priority order 4: order match / Priority order 4 : order match 
if(output.length < 10){ 
    for (let i = 0;i<data.length && output.length < 10;i++) {
    let str: string = data[i];
    str = str.toLocaleLowerCase();
    userinput = userinput.toLocaleLowerCase();
    let arr = new Array();
    for(let j=0;j<userinput.length;j++){
        if(str.includes(userinput.charAt(j)))
        {
            arr[i] = str.includes(userinput.charAt(j));
        }
        else{
            break;
        }
    }

    for(let j=0;j<arr.length-1;j++){
        if(arr[i]<arr[i+1]){
            output.push(str);
        }
    }


}
}


  // Priority 5: Random order match 
  if (output.length < 10) {
    for (let i = 0; i < data.length; i++) {
      let str: string = data[i];
      str = str.toLocaleLowerCase();
      userinput = userinput.toLocaleLowerCase();
      let map = new Map();
      for (let i = 0; i < str.length; i++) {
        if (map.has(str.charAt(i))) {
          map.set(str.charAt(i), map.get(str.charAt(i)) + 1);
        } else {
          map.set(str.charAt(i), 1);
        }
      }
      let j;
      for (j = 0; j < userinput.length; j++) {
        if (map.has(userinput.charAt(j)) && map.get(userinput.charAt(j)) > 0) {
          map.set(userinput.charAt(j), map.get(userinput.charAt(j)) - 1);
        } else {
          break;
        }
      }
      if (j === userinput.length) {
        output.push(str);
        if (output.length >= 10) break;
      }
      map.clear();
    }
  }

  return output;

}

function Autocomplete() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);
  const [timemeasure, setimemeasure] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const start: number = performance.now(); // Start time measurement
    setInput(e.target.value);
    if (e.target.value.length >= 2) {
      setOutput(appLogic(data, e.target.value));
    } else {
      setOutput([]);
    }
    const end: number = performance.now(); // End time measurement
    setimemeasure(end - start);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Input string"
      />
      <div>
        {input.length >= 2 ? (
          <div>
            <p>Results:</p>
            <ul>
              {output.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Please type at least 2 characters</p>
        )}
        <p>Render time: {timemeasure} ms</p>
      </div>
    </div>
  );
}

export default Autocomplete;
