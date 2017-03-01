Ext.define('erp.util.IdCardUtil',{
	statics:{
			Wi: [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ],    // 加权因子   
			ValideCode :[ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ],            // 身份证验证位值.10代表X 
			area:{11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
				31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
				43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",
				61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},  
			/**
			 *检测身份证
			*/
			checkCard:function(iden) {
				if(this.area[parseInt(iden.substr(0,2))]==null) {
			        return false;  
			    }   
				if(iden.length == 15) {
					if(this.is15Card(iden)) {
						this.go2(iden);
					}
					else {
						return false;
					}
				}
				else if (iden.length == 18) {
						var a_iden = iden.split("");
						if(this.is18Card(iden)&&this.is18CardEnd(a_iden)) {
							
							return this.go(iden);
						} 
						else {
							return false; 
						}
					}
					else {
						return false;
					}
			},
			
			/**
			 *检测18位身份证号最后一位是否符合要求
			 */
			is18CardEnd:function(a_idCard) {   
			    var sum = 0;								  
			    if (a_idCard[17].toLowerCase() == 'x') {   
			        a_idCard[17] = 10;						   
			    }   
			    for ( var i = 0; i < 17; i++) {   
			        sum += this.Wi[i] * a_idCard[i];				
			    }   
			    valCodePosition = sum % 11;					 
			    if (a_idCard[17] == this.ValideCode[valCodePosition]) {   
			        return true;   
			    } else {   
			        return false;   
			    }   
			},
			
			/*
			
			 *验证最后一位校正码
			
			 */
			is18Card:function(idCard18){   
			    var year =  idCard18.substring(6,10);   
			    var month = idCard18.substring(10,12);   
			    var day = idCard18.substring(12,14);   
			    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
			    if(temp_date.getFullYear()!=parseFloat(year)   
			          ||temp_date.getMonth()!=parseFloat(month)-1   
			          ||temp_date.getDate()!=parseFloat(day)){   
						return false;   
			    }else{   
			        return true;   
			    }   
			},
			
			is15Card:function(idCard15){   
			    var year =  idCard15.substring(6,8);   
			    var month = idCard15.substring(8,10);   
			    var day = idCard15.substring(10,12);   
			    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
			    if(temp_date.getYear()!=parseFloat(year)||temp_date.getMonth()!=parseFloat(month)-1   
			            ||temp_date.getDate()!=parseFloat(day)) {   
					return false;   
				}else{   
			        return true;   
			    }   
			},
			
			/**
			 *实现自动生成生日，性别，年龄
			*/
			go:function(iden){
				var result={};
				var sex = null;
				var age = null;
				var birth = null;
				var myDate = new Date(); 
				var month = myDate.getMonth() + 1; 
				var day = myDate.getDate();
				var age = myDate.getFullYear() - iden.substring(6, 10) - 1; 
				sex = iden.substring(16,17);
				birth = iden.substring(6,10)+"-"+iden.substring(10,12)+"-"+iden.substring(12,14);
				if (iden.substring(10, 12) < month || iden.substring(10, 12) == month && iden.substring(12, 14) <= day) { 
						age++; 
				} 
				if(sex%2 == 0)
					sex = "F";
				else
					sex = "M";
				result.sex=sex;
				result.age=age;
				result.birth=birth;
				result.area=this.area[parseInt(iden.substr(0,2))];
				return result;
			},
			
			
			go2:function(iden)
			{
				result={};
				var sex = null;
				var age = null;
				var birth = null;
				sex = iden.substring(13,14);
				birth = "19"+iden.substring(6,8)+"-"+iden.substring(8,10)+"-"+iden.substring(10,12);
				var myDate = new Date(); 
				var month = myDate.getMonth() + 1; 
				var day = myDate.getDate();
				var age = myDate.getFullYear() - iden.substring(6, 8) - 1901;
				if (iden.substring(8, 10) < month || iden.substring(8, 10) == month && iden.substring(10, 12) <= day) { 
									age++; 
				} 
				if(sex%2 == 0)
					sex = "F";
				else
					sex = "M";
				result.sex=sex;
				result.age=age;
				result.birth=birth;
				result.area=this.area[parseInt(iden.substr(0,2))];
				return result;
			}
	}
	
})