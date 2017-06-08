#include <iostream>
#include <random>
#include <ctime>
#include <fstream>

using namespace std;


/////////////
// GLOBALS //
/////////////

struct option
{
    double obj;
    double subj;
    int eval;
};


//parameters
const double tresh1 = 1.0;
const double tresh2 = 2.5;
const double noise = 0.5;
const double probsample = 0.5;
const double recency = 0.5;

double chancetocheck = 0.5;

int const timelimit = 200;

int const consider_size = 3;
option consider[consider_size];


int chosen = -1;


/////////////////
///OUTPUT JAVA///
/////////////////

//option arrays
option option1[timelimit];
option option2[timelimit];
option option3[timelimit];

//whathappened array
int whathappenedarray[timelimit];

//newopt + array
int newopt;
int newoptarray[timelimit];

//happened to + array
int happenedto;
int happenedtoarray[timelimit];

//discarded options + array
option discarded;
option discardedarray[timelimit];


//random stuff
mt19937 mt(time(0));
uniform_int_distribution<int> RandomOpt(0, (consider_size-1));
uniform_real_distribution<double> Uniform(0, 1);
normal_distribution<double> Normal(0, 1);

ofstream output;


//////////////
// FUNTIONS //
//////////////

void init()
{
    for(int i = 0; i<consider_size; ++i)                        //*initializing
    {
        consider[i].obj = -1000;
        consider[i].subj = -1000;
        consider[i].eval = 0;

    }
    for(int j = 0; j < timelimit; ++j)
    {
        option1[j].subj = -1000;
        option1[j].obj = -1000;
        option2[j].subj = -1000;
        option2[j].obj = -1000;
        option3[j].subj = -1000;
        option3[j].obj = -1000;

        discardedarray[j].subj = -1000;
    }

}

int explore(int chosen)
{
    option thisopt;

    //the subjective value of a new option is equal to the objective value (randomly drawn from normal distribution) and some noise
    thisopt.obj = Normal(mt);
    thisopt.subj = thisopt.obj + Normal(mt)*noise;
    thisopt.eval = 1;

    int minsubj = 0;

    //the option with the lowest subjective value is located
    for(int i=1; i<consider_size; ++i)
    {
        if(consider[i].subj < consider[minsubj].subj)
        {
            minsubj = i;
        }
    }

    //if the option in S with the smallest subjective value has a smaller subjective value than the new option, the new option replaces the lowest option is S
    if(consider[minsubj].subj < thisopt.subj)
    {
        discarded.subj = consider[minsubj].subj;
        consider[minsubj] = thisopt;
        newopt = 1;                                     //document that new option is found
        happenedto = minsubj+1;                         //and document which option this happened to
    }
    //otherwise, the newly explored option is ignored and documented as discarded
    else
    {
        discarded.subj = thisopt.subj;
    }

	//if the new option has a higher subjective value than tresh 2, this function returns its index as the chosen option
    if(thisopt.subj > tresh2)
    {
        return minsubj;
    }
    //if this is not the case, this function returns -1, which means 'no choice made'
    else
    {
        return -1;
    }
}

int exploit(int chosen)
{
    int pick;

    //if no choice is made, pick a random option in S for exploitation, but only if it is above tresh1
    if(chosen == -1)
        {
            pick = RandomOpt(mt);
            while (consider[pick].subj < tresh1)
                {
                pick = RandomOpt(mt);
                }
        }

    //if a choice is about to be made for an option (i.e. option is above t2), exploit that option
    else
        {
            pick = chosen;
        }

	//update the option that was drawn according to exploitation process
    double thissubj = consider[pick].obj + Normal(mt)*noise;
    consider[pick].subj = ((consider[pick].subj * consider[pick].eval) * recency + thissubj)/(consider[pick].eval * recency + 1);
    consider[pick].eval += 1;


	//if the newly exploited option has a higher subjective value than tresh 2, this function eventually returns its index as the chosen option
	if(consider[pick].subj > tresh2)
        {
            chosen = pick;
        }

    happenedto = pick+1;
	return(chosen);
}


void writedata()
{

//output discarded options
    output<<"var Option0 = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<discardedarray[i].subj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output subj1
    output<<"var Option1 = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option1[i].subj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output obj1
    output<<"var Option1Obj = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option1[i].obj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";


//output subj2
    output<<"var Option2 = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option2[i].subj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output obj2
    output<<"var Option2Obj = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option2[i].obj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output subj3
    output<<"var Option3 = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option3[i].subj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output obj3
    output<<"var Option3Obj = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<option3[i].obj;
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output whathappened
    output<<"var WhatHappened = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<whathappenedarray[i];
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output newopt
    output<<"var NewOpt = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<newoptarray[i];
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output happenedto
    output<<"var HappenedTo = [";
     for(int i = 0; i < timelimit; ++i)
     {
        output <<happenedtoarray[i];
        if (i < timelimit-1)
            output<<",";
     }
    output <<"];\n";

//output thresholds
    output<<"var Thresh1 = ["<<tresh1<<"];\n";
    output<<"var Thresh2 = ["<<tresh2<<"];\n";
}


//////////
// main //
//////////

int main()
{
    init();
    output.open("../script/arrays.js");
    int chosen = -1;

    for(int i = 0; i < timelimit; ++i)
    {
        //variables that get initialized to these values every time step
        int goodoption = 0;
        int whathappened=-1;
        int choicemade=0;
        newopt=0;
        happenedto=0;
        discarded.subj=-1000;

        //for every option, check whether it crosses t1 or t2, if so assign state: good option found, or choice about to be made
        for(int j = 0; j<consider_size; ++j)
        {
            if(consider[j].subj > tresh1)
            {
                goodoption = 1;
            }
            if(consider[j].subj > tresh2)
            {
                choicemade = 1;
            }
        }

        //if no option is above tresh 2
        if(choicemade == 0)
        {
            //and if there is also no option above tresh 1, must explore:
            if(goodoption == 0)
            {
                chosen = explore(chosen);
                whathappened=4;
            }

            //if there is an option above tresh 1 (but no choice made), explore if a randomly drawn number is lower than parameter 'probsample', otherwise exploit:
            else
            {
                if(Uniform(mt)<probsample)
                {
                    chosen = explore(chosen);
                    whathappened=4;
                }
                else
                {
                    chosen = exploit(chosen);
                }
            }

        }

        //if an option is about to be chosen (choice made), there is a chance to 'check' whether it is actually any good by exploiting the option:
        if (choicemade == 1)
        {
            if (Uniform(mt)<chancetocheck)
            {
                chosen = exploit(chosen);
            }
            //if the chosen option is not exploited, process ends
            else
            {
                break;
            }
        }

        //create arrays for animation in java
        option1[i].subj= consider[0].subj;
        option2[i].subj= consider[1].subj;
        option3[i].subj= consider[2].subj;

        option1[i].obj= consider[0].obj;
        option2[i].obj= consider[1].obj;
        option3[i].obj= consider[2].obj;

        discardedarray[i].subj= discarded.subj;

        whathappenedarray[i]= whathappened;
        newoptarray[i]= newopt;
        happenedtoarray[i]= happenedto;

    }

         writedata();


    return 0;
}
