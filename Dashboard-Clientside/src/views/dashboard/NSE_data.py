# -*- coding: utf-8 -*-
# class to fetch data from NSE website


from io import BytesIO
import time
from datetime import date,timedelta,datetime
import pandas as pd
from zipfile import ZipFile


#Internal Modules
import appurlopener
import json



class NSEdata:
    
    def __init__(self,query_date = date.today()):
        self.query_date = query_date
        self.crnt_time = time.strftime("%H:%M")
        self.holiday_list = self.get_nse_holiday_list()
        
    def get_bhav_copy_data(self,date_inp):
        
        opener = appurlopener.AppURLopener()
        #url = 'https://www.bseindia.com/download/BhavCopy/Equity/EQ'+date_inp+'_CSV.ZIP'
        bhavcopy_url = f'https://archives.nseindia.com/content/historical/EQUITIES/{date_inp[-4:]}/{date_inp[-7:-4]}/cm{date_inp}bhav.csv.zip'
        full_bhavcopy_url = f'https://archives.nseindia.com/products/content/sec_bhavdata_full_{datetime.strptime(date_inp, "%d%b%Y").strftime("%d%m%Y")}.csv'
        
        print(bhavcopy_url)
        
        print(full_bhavcopy_url)
        
        response = opener.open(bhavcopy_url)
        zipfile = ZipFile(BytesIO(response.read()))
        print(zipfile.namelist())
        dateFile='cm'+date_inp+'bhav.csv'
        
        df = pd.read_csv(zipfile.open(dateFile))

        df.to_csv('bhavcopy.csv',index=False)
        json_input = df.to_json(orient = 'records')
        print(json_input)
        
        
        df = pd.read_csv(full_bhavcopy_url)
        
        #df_transposed = df.T.head()
        #print(df_transposed.iloc[1:])
        
        #for i in json_input:
            #print(i)
        
        
        with open('data.json', 'w') as json_obj:
            json_obj.write(json_input)

        df.to_csv('full_bhavcopy.csv',index=False)
        
    
    def get_bhav_copy_date(self):
        
        weekdayNum=self.query_date.weekday()
        print(weekdayNum)
        if weekdayNum<5:
                if self.crnt_time < '18:00' and self.query_date == date.today():
                    print(weekdayNum)
                    if(weekdayNum==0):
                        dateUsed = ( self.query_date - timedelta(days = 3)).strftime("%d%b%Y")
                        while dateUsed in self.holiday_list:
                            dateUsed = (datetime.strptime(dateUsed, '%d%b%Y') - timedelta(days = 1)).strftime("%d%b%Y")
                        print(dateUsed)
                    else:
                        dateUsed = ( self.query_date - timedelta(days = 1)).strftime("%d%b%Y")
                        while dateUsed in self.holiday_list:
                            dateUsed = (datetime.strptime(dateUsed, '%d%b%Y') - timedelta(days = 1)).strftime("%d%b%Y")
                        print(dateUsed)
                        
                else:
                    print("AFTER 6 PM ")
                    if self.query_date == date.today():
                        dateUsed = ( self.query_date).strftime("%d%b%Y")
                        while dateUsed in self.holiday_list:
                            dateUsed = (datetime.strptime(dateUsed, '%d%b%Y') - timedelta(days = 1)).strftime("%d%b%Y")
                        print(dateUsed)
                    else:
                        dateUsed = ( self.query_date - timedelta(days = 1)).strftime("%d%b%Y")
                        while dateUsed in self.holiday_list:
                            dateUsed = (datetime.strptime(dateUsed, '%d%b%Y') - timedelta(days = 1)).strftime("%d%b%Y")
                        print(dateUsed)
                    
        else:
        
          print("WEEKENDS")
          if(weekdayNum == 5):
              dateUsed = (self.query_date - timedelta(days = 1)).strftime("%d%b%Y")             
          else:
              dateUsed = (self.query_date - timedelta(days = 2)).strftime("%d%b%Y")
          while dateUsed in self.holiday_list:
            dateUsed = (datetime.strptime(dateUsed, '%d%b%Y') - timedelta(days = 1)).strftime("%d%b%Y")
          print(dateUsed)
          
        return dateUsed.upper()



    def get_nse_holiday_list(self):
        
        df = pd.read_csv('nse_holiday.csv')
        
        holiday_list  = [ datetime.strptime(i, '%d-%b-%y').strftime("%d%b%Y") for i in  df['Date'].values]
        print(holiday_list)
        return holiday_list

#date_imput = '20Oct2021'
nseobj = NSEdata()#datetime.strptime(date_imput, '%d%b%Y'))
nseobj.get_bhav_copy_data(nseobj.get_bhav_copy_date())
