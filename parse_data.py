import pandas as pd
import matplotlib.pyplot as plt
import json

gdp = pd.read_csv("https://raw.githubusercontent.com/PitchInteractiveInc/tilegrams/master/data/us/population-by-state.csv", header=None)
ev = pd.read_csv("https://raw.githubusercontent.com/PitchInteractiveInc/tilegrams/master/data/us/gdp-by-state.csv", header=None)
pop = pd.read_csv("https://raw.githubusercontent.com/PitchInteractiveInc/tilegrams/master/data/us/population-by-state.csv", header=None)



print(gdp.head())
print(pop.head())
print(ev.head())

with open("statekey.json") as f:
    info = json.load(f)

# for value in info:
#     print(value["name_short"])

print(info)