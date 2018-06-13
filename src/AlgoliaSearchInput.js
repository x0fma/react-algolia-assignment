import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import HintPaper from './HintPaper';


class AlgoliaSearchInput extends React.Component {
    state = {
        hintPaperOpen: false,
        hits: {},
        value: '',
    }

    client = null
    helpers = []

    constructor(props) {
        super(props);
        const { appId, searchApiKey, indexes } = props;
        this.client = algoliasearch(appId, searchApiKey);
        this.helpers = Object.keys(indexes).map(index =>
            algoliasearchHelper(this.client, index, {
                hitsPerPage: 10
            })
        );
        this.addListeners();
    }

    componentWillUnmount = () => {
        this.removeListeners();
    }

    addListeners = () => {
        this.helpers.forEach(helper => {
            const { index } = helper.state;
            helper.on('result', (data) => {
                const { hits } = data;
                this.setState(ps => {
                    const { [index]: currHit, ...otherHits } = ps.hits;
                    if (hits.length) {
                        return {
                            hintPaperOpen: true,
                            hits: {
                                ...otherHits,
                                [index]: hits,
                            },
                        }
                    }
                    return {
                        hits: otherHits,
                    }
                });
            });
        });
    }

    removeListeners = () => {
        this.helpers.forEach(helper => {
            helper.removeAllListeners('result');
        });
    };

    queryAlgolia = (query) => {
        this.helpers.forEach(helper => {
            helper.setQuery(query).search();
        });
    }

    onClickCloseIcon = (e) => {
        this.setState({
            hintPaperOpen: false,
            hits: {},
            value: '',
        })
    }

    onInputBlur = (e) => {
        this.setState({ hintPaperOpen: false });
    }

    onInputChange = (e) => {
        const { value } = e.target;
        this.setState({ value });
        if (value) {
            this.queryAlgolia(value);
        } else {
            this.setState({ hintPaperOpen: false, hits: {} });
        }
    }

    onInputFocus = (e) => {
        if (this.state.value) {
            this.setState({ hintPaperOpen: true });
        }
    }

    render = () => {
        const { indexes, inputLabel } = this.props;
        const { hintPaperOpen, hits, value } = this.state;

        return (
            <div>
                <TextField
                    fullWidth
                    helperText={!hintPaperOpen && 'Type something to start searching'}
                    label={inputLabel}
                    InputProps={{
                        endAdornment: value ? (
                            <CloseIcon onClick={this.onClickCloseIcon} style={{ cursor: 'pointer' }} />
                        ) : null
                    }}
                    onBlur={this.onInputBlur}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    value={value}
                />
                <HintPaper
                    conf={indexes}
                    hits={hits}
                    open={hintPaperOpen}
                />
            </div>
        );
    }
}

AlgoliaSearchInput.propTypes = {
    appId: PropTypes.string.isRequired,
    indexes: PropTypes.objectOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string,
    })).isRequired,
    inputLabel: PropTypes.string.isRequired,
    searchApiKey: PropTypes.string.isRequired,
};

export default AlgoliaSearchInput;