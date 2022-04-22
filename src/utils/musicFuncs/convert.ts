  
 

    function convertNumber(number, decPlaces) {
       
        decPlaces = Math.pow(10,decPlaces);

        var abbrev = [ "K", "M", "B", "T" ];

      
       for (var i=abbrev.length-1; i>=0; i--) {

            var size = Math.pow(10,(i+1)*3);
          
            if(size <= number) {
                
                number = Math.round(number*decPlaces/size)/decPlaces;

               
                if((number == 1000) && (i < abbrev.length - 1)) {
                    number = 1;
                    i++;
                }

                number += abbrev[i];

                break;
            }
        }

        return number;
    }
 
    function convertMsToHms(hms)  {
        if (hms.length < 3) {
            return hms = ((+[0]) * 1000)
        } else if (hms.length < 6) {
            const a = hms.split(':')
            return hms = (((+a[0]) * 60 + (+a[1])) * 1000)
        } else {
            const a = hms.split(':')
            return hms = (((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])) * 1000)
        }
    }

