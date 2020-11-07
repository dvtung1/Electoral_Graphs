import geopandas as gpd
import matplotlib.pyplot as plt
import pandas as pd
import geoplot

us = gpd.read_file("cb_2018_us_state_20m\cb_2018_us_state_20m.shp")

df_states = pd.read_csv("graphing_data_aref\state_data")


us['whiteness lol'] = df_states['N.H.W. Percentage']
us["demon time"] = df_states["E.C. Votes"] / df_states["Population"]

f, ax = plt.subplots(1, figsize=(100, 100))

#put an option for if people want the electoral votes / person
us.plot(column='demon time', ax=ax, cmap='Greens')

# another option for if people want to see whiteness
# us.plot(column="whiteness lol", ax=ax, cmap="coolwarm")


plt.show()
# map_df is a Pandas dataframe
