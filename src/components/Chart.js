import React,{Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';

class Chart extends Component{
	

	constructor(props){ 
	    
	
		 super(props);
		
		
		
		 this.state={
			 measure: [],
			 num1:"",
			
			 aa:0,
		     pp:"",
			 chartData:{
				 labels:["hassleholm",'kristianstad','malmo'],
				 datasets:[
				 {
					 label:'fffff',
					 data:[
						this.props.mynum1,
						8,
						2
					 ],
						
					 
					 backgroundColor:[
					    'rgba(255,99,132,0.6)',
						'rgba(54,162,235,0.6)',
						'rgba(255,206,86,0.6)'
						
					 ]
				 }
				 ]
			 }
		 }

		 this.getMeasurement = this.getMeasurement.bind(this);
	}	
	
	
	
	 componentDidMount() {
      
        this.getMeasurement();
     
        this.interval = setInterval(() => {
          
            this.getMeasurement();
            
          }, 600)
    }
	
	 getMeasurement(mynum1,mynum2,mynum3){
        
     fetch('http://localhost:5000/measurement/chart')
            .then(response =>response.json())
            .then(response =>this.setState({ measure: response.data }))
            .catch(err => console.error(err))

			 var pp=JSON.stringify(this.state.measure);
			//alert(pp[30]);
			//this.state.aa=pp[30];
			
			//alert(this.state.aa);
			//alert(pp[63]); 
			//alert(pp[90]); 

		   // alert("this is num1:"+this.props,mynum1);

		
		    mynum1=pp[30];
		
		   
            //alert("mynum1 is:"+mynum1);
		  
	 }
	 
	 
	 static defaultProps = {
		
		mynum1:5,
		 mynum2:30,
		 mynum3:1
	};

	 
	render(){
		
	
		
		
		return(
		  <div className="chart">
		  <Bar
		  data={this.state.chartData}
		  
		  options={{
              title:{
				  display:true,
				  text:'areaChart',
				  fontSize:25
			  },
			  legend:{
				  display:true,
				  position:'right'
			  },
			  
			  
    }}
		  />
		 
	          
		  
		  </div>
		
		)
	}
}
export default Chart;