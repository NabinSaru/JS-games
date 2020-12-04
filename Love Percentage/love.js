submitInformation = function(evt){

		var name1=document.getElementById("name1");  
		var name2=document.getElementById("name2");  
		var firstname=name1.value;
		var secondname=name2.value;
		function lengthCheck(){
			if(name1.value==""||name2.value=="")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		var inputLength= lengthCheck();
		console.log(inputLength);
		if(inputLength==true)
		{
			alert("Please fill Required field");
			window.location.reload();
		}
		var calculatedLovePercentage=0;
		var loves=['l','o','v','e','s'];
		var combined=[];
		var number=[];
		firstname=firstname.toString();
		secondname=secondname.toString();
		firstname=firstname.toLowerCase();
		secondname=secondname.toLowerCase();
		var split1 =firstname.replace(/ /g, '').split('');
		var split2 =secondname.replace(/ /g, '').split('');
		combined=split1.concat(loves);
		combined=combined.concat(split2);
		(function numbering(array)
				{
					while(array.length!=0)
					{
						var counter=1;
						var alphaPosition=[0];
						for(i=1;i<array.length;i++)
						{
							if(array[0]===array[i])
							{
								counter++;
								alphaPosition.push(i);
							}
						}
						number.push(counter);
						alphaPosition=alphaPosition.reverse();
						for(i=0;i<alphaPosition.length;i++)
						{
							array.splice(alphaPosition[i],1);
						}

					}
				})(combined);
		calculation(number);

		function calculation(number1){
			
			var number=Object.create(number1);
			var newarray=[];
			while(number.length>1)
			{
				var x= number.shift();
				var y= number.pop();
				var z= x+y;
						newarray.push(z);
			}
			if(number.length==1)
			{
				newarray.push(number.pop());
			}
			console.log(newarray);
			if(newarray.length>2)
			{
				calculation(newarray);
			}
			else
			{
				if((newarray[0]*10+newarray[1])>100)
				{
					var sum=(parseInt(newarray[0]/10)+(newarray[1]%10))*10+(newarray[0]%10+parseInt(newarray[1]/10));
							while(sum>100){
						sum=(parseInt(sum/100)+sum%10)*10+parseInt(sum/10);
					}
					calculatedLovePercentage=sum;
				}
				else if((newarray[0]*10+newarray[1])==100)
				{
					calculatedLovePercentage=100;
				}
				else{
					calculatedLovePercentage=(newarray[0]*10)+newarray[1];
				}
						
			}
		}

        evt.preventDefault();
          // Stop the form from reloading the page 
        evt.stopPropagation();
          // Stop the form from reloading the page
        if(!lengthCheck)
        {
        	alert("Please Enter the required info:");
        	window.location.reload();
        }
        document.getElementById("result").innerHTML="Your love percentage is:";
        document.getElementById("percentage").innerHTML=calculatedLovePercentage+"%";

        if(calculatedLovePercentage>=95)
        {
        	document.getElementById("comment").innerHTML="You two are a match made in heaven.";
        }
        else if(calculatedLovePercentage>=85)
        {
        	document.getElementById("comment").innerHTML="Intelligence and wisdom are certainly compatible, however they are rarely seen in each other’s company.";
        }
        else if(calculatedLovePercentage>=75)
        {
        	document.getElementById("comment").innerHTML="Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.";
        }
        else if(calculatedLovePercentage>=65)
        {
        	document.getElementById("comment").innerHTML="Research shows that couples who have a lot of similarities, including intellectual compatibility, end up staying together.";
        }
        else if(calculatedLovePercentage>=55)
        {
        	document.getElementById("comment").innerHTML="A lasting relationship isn't about marriage. It's about compatibility and communication. And you both need to want it to work.";
        }
        else if(calculatedLovePercentage>=45)
        {
        	document.getElementById("comment").innerHTML="Together, you two form a necessary paradox; not a senseless contradiction.";
        }
        else if(calculatedLovePercentage>=35)
        {
        	document.getElementById("comment").innerHTML="Summer and Winter were not supposed to fall in love.";
        }
        else
        {
        	document.getElementById("comment").innerHTML="We are Polar opposites, that's why we are complete contradictions; Maybe that's why We repel.";
        }
    }
// var form = document.getElementById('form'); 
// form.addEventListener('submit', submitInformation); // Listen for submit event
// var reset=document.getElementById('resetValue');
// reset.addEventListener('click',function(e){
// 	document.getElementById('form').reset();
// 	window.location = window.location.href;
// 	window.location.reload();
// })
var submitButton= document.getElementById("submitButton");
submitButton.addEventListener('click',submitInformation,false);
