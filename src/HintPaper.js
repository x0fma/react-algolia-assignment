import React from 'react';
import PropTypes from 'prop-types';
import Hotkeys from 'react-hot-keys';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

class HintPaper extends React.Component {
    state = {
        selected: null,
    }

    componentDidUpdate = (props, state) => {
        if (state.selected && !Object.is(props.hits, this.props.hits)) {
            this.setState({
                selected: null
            });
        }
    }

    isSelected = (selected, index, row) =>
        selected && (selected.index === index && selected.row === row)

    onKeyDown = (key, e, handle) => {
        const { hits } = this.props;
        const indexes = Object.keys(hits);
        if (indexes.length) {
            this.setState(ps => {
                const { selected } = ps;
                switch (key) {
                    case 'down':
                        if (!selected) {
                            return {
                                selected: {
                                    index: 0,
                                    row: 0
                                }
                            };
                        } else {
                            if (selected.row < (hits[indexes[selected.index]].length - 1)) {
                                return {
                                    selected: {
                                        index: selected.index,
                                        row: selected.row + 1
                                    }
                                };
                            }
                        }
                        break;
                    case 'up':
                        if (selected && selected.row > 0) {
                            return {
                                selected: {
                                    index: selected.index,
                                    row: selected.row - 1
                                }
                            };
                        }
                        break;
                    case 'left':
                        if (selected && selected.index > 0) {
                            return {
                                selected: {
                                    index: selected.index - 1,
                                    row: 0
                                }
                            };
                        }
                        break;
                    case 'right':
                        if (selected && selected.index < (indexes.length - 1)) {
                            return {
                                selected: {
                                    index: selected.index + 1,
                                    row: 0
                                }
                            };  
                        }
                        break;
                    default:
                        break;
                }
                return selected;
            });
        }
    }

    getEmptyList = () => (
        <List
            dense
            disablePadding
        >
            <ListItem>
                <ListItemText primary='No results' />
            </ListItem>
        </List>
    )

    renderHits = () => {
        const { conf, hits } = this.props;
        const { selected } = this.state;
        const indexes = Object.keys(hits);

        if (!indexes.length) return this.getEmptyList();

        return indexes.map((index, i) => {
            const indexConf = conf[index];
            return (
                <List
                    key={index}
                    dense
                    disablePadding
                    style={{ flex: 1 }}
                    subheader={<ListSubheader>{indexConf.label}</ListSubheader>}
                >
                    {hits[index].map((res, row) => (
                        <ListItem
                            key={res.objectID} 
                            button
                            onMouseOver={selected && (() => this.setState({ selected: null }))}
                            style={this.isSelected(selected, i, row) ? { backgroundColor: 'rgba(0,0,0,0.08)'} : {}}
                        >
                            <ListItemText
                                primary={res[indexConf.primary]}
                                secondary={indexConf.secondary && res[indexConf.secondary]}
                            />
                        </ListItem>
                    ))}
                </List>
            );
        });
    }

    render = () => {
        const { open } = this.props;

        if (!open) return null;

        return (
            <Hotkeys 
                keyName="down,up,left,right"
                onKeyDown={this.onKeyDown}
            >
                <Paper style={{ display: 'flex'}}>
                    {this.renderHits()}
                </Paper>
            </Hotkeys>
        );
    }
}

HintPaper.propTypes = {
    conf: PropTypes.object.isRequired,
    hits: PropTypes.object,
    open: PropTypes.bool,
};

HintPaper.defaultProps = {
    hits: {},
    open: false,
};

export default HintPaper;