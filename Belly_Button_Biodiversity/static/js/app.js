function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // var selector = d3.select("#selDataset");
  let metaSample = "/metadata/" + sample;
  let jage = document.getElementById("hage");
  let jbbtype = document.getElementById("hbbtype");
  let jethnicity = document.getElementById("hethnicity");
  let jgender = document.getElementById("hgender");
  let jlocation = document.getElementById("hlocation");
  let jwfreq = document.getElementById("hwfreq");
  let jsample = document.getElementById("hsample");

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(metaSample).then(function(data){
    // Use `.html("") to clear any existing metadata
  
  jage.textContent = "Age: " + data.AGE;
  jbbtype.textContent = "BBTYPE: " + data.BBTYPE;
  jethnicity.textContent = "Ethnicity: " + data.ETHNICITY;
  jgender.textContent = "GENDER: " + data.GENDER;
  jlocation.textContent = "LOCATION: " + data.LOCATION;
  jwfreq.textContent = "WFREQ: " + data.WFREQ;
  jsample.textContent = "SAMPLE: " + data.sample;
  
});
  

    



    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  let sampleSamples = "/samples/" + sample;


d3.json(sampleSamples).then(function(data) {
  let otu_ids = data.otu_ids.slice(0,10);
  let samp_val = data.sample_values.slice(0,10);
  let otu_lab = data.otu_labels.slice(0,10);
  console.log(otu_ids);
  console.log(samp_val);

  let trace1 = {
  labels: otu_ids,
  values: samp_val,
  type: "pie"
  };
  let pieData = [trace1];

  let layout = {
    
    autosize: false,
    width: 800,
    height: 800,
    margin: {
      l: 50,
      r: 50,
      b: 100,
      t: 100,
      pad: 4
    }

  };
  Plotly.newPlot("pie", pieData, layout);


let trace2 = {
  x: otu_ids,
  y: samp_val,
  text: otu_lab,
  mode: 'markers',
  marker: {
    size: samp_val,
    color: otu_ids
    
   
  }
};

let bubbleData = [trace2];

let bubbleLayout = {
  
  showLegend: false,
  // height: 600,
  // width: 1000
  // margin: {
  //   l: 50,
  //   r: 50,
    // b: 100,
    // t: 25,
    // pad: 4
  // }
  
};

Plotly.newPlot("bubble",bubbleData,bubbleLayout);

});
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
        
    });
    
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
