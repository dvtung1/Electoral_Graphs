import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

import math

import json

df = pd.read_csv("graphing_data_aref/state_data")


pop = df["Population"].to_numpy()/math.pow(10, 6)

ecv_million = (df["E.C. Votes"].to_numpy() / pop)
df = df.assign(rationed_ecv = ecv_million)


#####

fig = plt.figure() # Create matplotlib figure

ax = fig.add_subplot() # Create matplotlib axes

# ax.set_xticks(np.arange(51))
# ax.set_xticklabels(df.State.to_numpy())
ax.set_title('Correlating Race-Makeup and Electoral Value')


ax2 = ax.twinx() # Create another axes that shares the same x-axis as ax.

width = 0.4

df.rationed_ecv.plot(kind='bar', color='orange', ax=ax, width=width, position=1)
df["N.H.W. Percentage"].plot(kind='bar', color='blue', ax=ax2, width=width, position=0)

ax.set_ylabel("Electoral Votes / 1 Million Residents")
ax2.set_ylabel("Non-Hispanic White Pop. / 100 state residents")

ax.axes.set_xlabel("State")

ax.legend()


ax.set_xticks(np.arange(51))
ax.set_xticklabels(df.State, rotation=90)


plt.show()
####