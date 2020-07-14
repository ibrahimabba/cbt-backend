# Welcome to development branch

## To get started:

* Fork the repo from the develop branch.

* clone the forked repo.

## How to use Story Types
### Understanding the kind of changes you've made

* Features change something about your product.
* Bugs are simply things that are broken.
* Chores are the things you have to do that don’t actually change your product.<br/>*Read more* [here](https://clubhouse.io/blog/how-and-why-to-use-story-types-851eb651c81d/)

### Branch and Commit message naming convention

##### Branch Naming
Branches created should be named using the following format:<br/>
`{story type}-{2-3 word summary}-{issue tracker id}`

`story-type` - Indicates the context of the branch and should be one of:
* ft == Feature
* bg == Bug
* ch == Chore
* rf == Refactor

`story-summary` - Short 2-3 words summary about what the branch contains<br/>

Example of a feature branch: `ft-responsive-mobile-layout-11`

##### Commits
Format:<br>
`<type>(<scope>): <subject>``<BLANK LINE> <body> <BLANK LINE> <footer>`

`<type>` should be:
* feature
* bug
* chore
* release
* refactor
* documentation
* style
* test

`<scope>` should be something specific to the commit change.
Example of a commit message: `feature(logo): add logo to the toolbar[finishes #45]`<br>
Read more [here](https://github.com/andela/bestpractices/wiki/Git-naming-conventions-and-best-practices)

### Recommended Git Workflow

You are required to create a separate branch using the naming convention above for each change you made and then merge
into the develop branch.<br>
[here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) is a good guide to getting yourself familiar with the git workflow.



