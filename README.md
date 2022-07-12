# Firestorm RIO

A raider.io like M+ scoring system for Firestorm Servers.
https://keepdying.github.io/firestorm-rio/

## Frequently Asked Questions

### How does this work?
**Every 12 hours**, **runs that can be seen on [Firestorm Ranking PvE](https://firestorm-servers.com/en/challenge/index/8) page** gets saved into database. If your run doesn't make it to that page, I won't have information about it and **It won't be added**. This is because **I don't have access to any internal data from Firestorm**.

### How do you score runs?

Exact scoring formula is given below:

```
    dungTimers = [+1 Timer, +2 Timer, +3 Timer]
    keylvltoscore = [...] # taken from raider.io addon
    
    max_soft_deplete_time = (dungTimers[0] * 2.5)  # assume max soft deplete time is 250% of timer. 

    soft_deplete_start_score = (keylvltoscore[lvl - 1] + 0.01)
    soft_deplete_125 = (keylvltoscore[lvl - 2] + 0.01)
    soft_deplete_150 = 0.01 if (lvl - 3) < 0 else (keylvltoscore[lvl - 3] + 0.01)
    soft_deplete_200 = 0.01 if (lvl - 4) < 0 else (keylvltoscore[lvl - 4] + 0.01)
    soft_deplete_250 = 0.01 if (lvl - 5) < 0 else (keylvltoscore[lvl - 5] + 0.01)

    timed_score = keylvltoscore[lvl]
    up_score = keylvltoscore[lvl + 1]

    if time >= max_soft_deplete_time:  # if went beyond
        score = soft_deplete_250

    elif (dungTimers[0] * 2.5) > time >= (dungTimers[0] * 2):  # if between (2 - 2.5) * dungtimer
        score = (((time - (dungTimers[0] * 2.5)) / ((dungTimers[0] * 2.50) - (dungTimers[0] * 2))) * (
                soft_deplete_250 - soft_deplete_200)) + soft_deplete_250

    elif (dungTimers[0] * 2) > time >= (dungTimers[0] * 1.50):  # if between (1.50 - 2) * dungtimer
        score = (((time - (dungTimers[0] * 2)) / ((dungTimers[0] * 2) - (dungTimers[0] * 1.50))) * (
                soft_deplete_200 - soft_deplete_150)) + soft_deplete_200

    elif (dungTimers[0] * 1.50) > time >= (dungTimers[0] * 1.25):  # if between (1.25 - 1.50) * dungtimer
        score = (((time - (dungTimers[0] * 1.50)) / ((dungTimers[0] * 1.50) - (dungTimers[0] * 1.25))) * (
                soft_deplete_150 - soft_deplete_125)) + soft_deplete_150

    elif (dungTimers[0] * 1.25) > time > dungTimers[0]:  # if between (1 - 1.25) * dungtimer
        score = (((time - (dungTimers[0] * 1.25)) / ((dungTimers[0] * 1.25) - dungTimers[0])) * (
                soft_deplete_125 - soft_deplete_start_score)) + soft_deplete_125
    else:
        score = ((time / dungTimers[0]) * (timed_score - up_score)) + up_score

    return = round(score, 2)
```

### Some of my runs are missing?

If your run doesn't appear on Firestorm website, I can't parse that. Also If your run didn't get parsed before weekly reset, You won't be able to see it.

Keep in mind most of the current data is gathered over past weeks in development by running parser manually so If you don't see a run you did 3 months ago don't blame me. 

### I want to see raw data?

Check players.json & runs.json in src folder.

### UI doesn't look good?

As you see I'm not much a front-end developer and having hard time with CSS. 

### I want to contribute?

You can check/change page's source in repo and make pull requests to contribute! 

### How can I contact you?

Discord: keepdying#5821
