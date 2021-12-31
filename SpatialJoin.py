import pandas as pd
import geopandas as gpd


jsonstores = ('layers/Stores.geojson')
stores = gpd.read_file(jsonstores)

jsonstates = ("layers/States.geojson")
states = gpd.read_file(jsonstates)

sjoined = gpd.sjoin(stores, states, how='right')

#sjoined.to_file("output.json", driver="GeoJSON")

#Will show counts by state
grp = sjoined.groupby(['name', 'STATE']).size().reset_index(name='counts')

#can sort
grpsrt = grp.sort_values(by=['STATE','counts'])

#take only last value (the greatest after sort)
grpdd = grpsrt.drop_duplicates(subset=['STATE'], keep='last')

#merge the dataframe to the geodataframe
test = states.merge(grpdd, on='STATE', how='left')

#output to file
test.to_file('layers/StatesCount.json', driver="GeoJSON")